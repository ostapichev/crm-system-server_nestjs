import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JwtConfig } from '../../../config';
import { TokenTypeEnum } from '../../../database/enums';
import { UsersService } from '../../users/services/users.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IActivateToken, ITokenPair } from '../interfaces/token-pair.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
  }

  public async generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accessToken, refreshToken };
  }

  public async generateActivateToken(
    payload: IJwtPayload,
  ): Promise<IActivateToken> {
    const user = await this.userService.getUser(payload.userId);
    const activateToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.activateSecret,
      expiresIn: this.jwtConfig.activateExpiresIn,
    });
    return {
      activateToken,
      message:
        `Link for activate user ${user.surname} created! ` +
        `Push on the button 'copy to clipboard', user id: ${user.id}.`,
    };
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum,
  ): Promise<IJwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getSecret(type: TokenTypeEnum): string {
    let secret: string;
    switch (type) {
      case TokenTypeEnum.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenTypeEnum.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      case TokenTypeEnum.ACTIVATE:
        secret = this.jwtConfig.activateSecret;
        break;
      default:
        throw new Error('Unknown token type');
    }
    return secret;
  }
}
