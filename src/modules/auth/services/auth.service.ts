import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';

import { Config, SuperUserConfig } from '../../../config';
import { RefreshTokenEntity, UserEntity } from '../../../database/entities';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/mappers/user.mapper';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly configService: ConfigService<Config>,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.entityManager.transaction(
      'REPEATABLE READ',
      async (em) => {
        await this.isEmailExistOrThrow(dto.email);
        const config = this.configService.get<SuperUserConfig>('superuser');
        const userRepository = em.getRepository(UserEntity);
        const password = await bcrypt.hash(config.password, 10);
        const user = await userRepository.save(
          this.userRepository.create({ ...dto, password }),
        );
        const tokens = await this.createTokens(user.id, em);
        return { user: UserMapper.toResponseItemDTO(user), tokens };
      },
    );
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    return await this.entityManager.transaction(
      'REPEATABLE READ',
      async (em) => {
        const user = await this.userRepository.findOne({
          where: { email: dto.email },
          select: { id: true, password: true, is_active: true },
        });
        if (!user || !user.is_active) {
          throw new UnauthorizedException('Invalid password or email');
        }
        const isPasswordValid = await bcrypt.compare(
          dto.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid password or email');
        }
        const tokens = await this.createTokens(user.id, em);
        const userEntity = await this.userRepository.findOneBy({ id: user.id });
        return { user: UserMapper.toResponseItemDTO(userEntity), tokens };
      },
    );
  }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.getByIdUser(userData.userId);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    return await this.entityManager.transaction(
      'REPEATABLE READ',
      async (em) => {
        await this.deleteRefreshToken(userData);
        return await this.createTokens(userData.userId, em);
      },
    );
  }

  public async signOut(userData: IUserData): Promise<void> {
    await this.deleteRefreshToken(userData);
  }

  private async createTokens(
    userId: number,
    em: EntityManager,
  ): Promise<TokenPairResDto> {
    const tokens = await this.tokenService.generateAuthTokens({
      userId,
    });
    const refreshTokenRepository = em.getRepository(RefreshTokenEntity);
    await Promise.all([
      refreshTokenRepository.save({
        refreshToken: tokens.refreshToken,
        user_id: userId,
      }),
      this.authCacheService.saveToken(tokens.accessToken, userId),
    ]);
    return tokens;
  }

  private async deleteRefreshToken(userData: IUserData): Promise<void> {
    const { userId } = userData;
    await Promise.all([
      this.refreshTokenRepository.delete({
        user_id: userId,
      }),
      this.authCacheService.deleteToken(userId),
    ]);
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
