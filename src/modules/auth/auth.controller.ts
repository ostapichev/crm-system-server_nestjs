import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserResDto } from '../users/dto/res/user.res.dto';
import { UserMapper } from '../users/mappers/user.mapper';
import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { ActivateUserReqDto } from './dto/req/activate-user.req.dto';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { BaseResDto } from './dto/res/base.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Activation user by activate token from link' })
  @SkipAuth()
  @Post('activate/:activateToken')
  @UseInterceptors(FileInterceptor(''))
  public async activateUser(
    @Body() dto: ActivateUserReqDto,
    @Param('activateToken') activateToken: string,
  ): Promise<BaseResDto> {
    return await this.authService.activateUser(activateToken, dto);
  }

  @ApiOperation({ description: 'Login user' })
  @SkipAuth()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @ApiOperation({ description: 'Get me data' })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    const result = await this.authService.findMe(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiOperation({ description: 'Post refresh token for get new tokens' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @SkipAuth()
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiOperation({ description: 'Log out' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.signOut(userData);
  }
}
