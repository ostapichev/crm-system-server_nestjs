import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { TokenTypeEnum } from '../../../database/enums';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/mappers/user.mapper';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>('SKIP_AUTH', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;
    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenTypeEnum.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      accessToken,
      TokenTypeEnum.ACCESS,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOne({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = UserMapper.toIUserData(user, payload);
    return true;
  }
}
