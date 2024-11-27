import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { RefreshTokenEntity, UserEntity } from '../../../database/entities';
import { UserRoleEnum } from '../../../database/enums';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { ListQueryDto } from '../../orders/dto/req/list-query.dto';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly authCashService: AuthCacheService,
  ) {}

  public async findAllUsers(
    query: ListQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.getListAllUsers(query);
  }

  public async banUser(userId: number, userData: IUserData): Promise<void> {
    await this.entityManager.transaction('SERIALIZABLE', async (em) => {
      const user = await this.getUser(userId);
      const userRepository = em.getRepository(UserEntity);
      const refreshTokenRepository = em.getRepository(RefreshTokenEntity);
      if (user.role === UserRoleEnum.SUPERUSER) {
        throw new ForbiddenException('You do not have permissions!');
      }
      if (!user.is_active) {
        throw new BadRequestException('The user is banned!');
      }
      await userRepository.update(userId, {
        is_active: false,
      });
      await this.authCashService.deleteToken(userId);
      await refreshTokenRepository.delete({ user_id: userId });
    });
  }

  public async unbanUser(userId: number, userData: IUserData): Promise<void> {
    const user = await this.getUser(userId);
    if (user.is_active) {
      throw new BadRequestException('The user is active!');
    }
    await this.userRepository.update(userId, {
      is_active: true,
    });
  }

  private async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
}
