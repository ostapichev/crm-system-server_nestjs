import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

import { Config, JwtConfig } from '../../../config';
import { TokenTypeEnum } from '../../../database/enums';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async saveToken(token: string, userId: number): Promise<void> {
    const key = this.getKey(userId, TokenTypeEnum.ACCESS);
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
  }

  public async saveActivateToken(token: string, userId: number): Promise<void> {
    const key = this.getKey(userId, TokenTypeEnum.ACTIVATE);
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.activateExpiresIn);
  }

  public async isAccessTokenExist(
    userId: number,
    token: string,
    tokenType: TokenTypeEnum,
  ): Promise<boolean> {
    const key = this.getKey(userId, tokenType);
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteToken(userId: number): Promise<void> {
    const key = this.getKey(userId, TokenTypeEnum.ACCESS);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: number, tokenType: TokenTypeEnum): string {
    if (tokenType === TokenTypeEnum.ACTIVATE) {
      return `ACTIVATE_TOKEN:${userId}`;
    }
    return `ACCESS_TOKEN:${userId}`;
  }
}
