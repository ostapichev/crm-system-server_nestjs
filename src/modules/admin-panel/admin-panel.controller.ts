import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SignUpReqDto } from '../auth/dto/req/sign-up.req.dto';
import { AuthResDto } from '../auth/dto/res/auth.res.dto';
import { BaseResDto } from '../auth/dto/res/base.res.dto';
import { AuthService } from '../auth/services/auth.service';
import { OrderStatisticMapper } from '../orders/mappers/order-statistic.mapper';
import { ActivateTokenResDto } from './dto/res/activate-token.res.dto';
import { OrdersStatisticDto } from './dto/res/orders-statistic.dto';
import { AdminGuard } from './guards/admin.guard';
import { IdMeGuard } from './guards/id-me.guard';
import { ActivateTokenMapper } from './mappers/activate-token.mapper';
import { AdminPanelService } from './services/admin_panel.service';

@ApiBearerAuth()
@ApiTags('Admin Panel')
@Controller('admin')
export class AdminPanelController {
  constructor(
    private readonly adminPanelService: AdminPanelService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ description: 'Create new user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Post()
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @ApiOperation({ description: 'Statistic for orders' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get('activate-user/:userId')
  public async getActivateUser(
    @Param('userId') userId: number,
  ): Promise<ActivateTokenResDto> {
    const result = await this.adminPanelService.getActivateToken(userId);
    return ActivateTokenMapper.toResponseItemDTO(result);
  }

  @ApiOperation({ description: 'Statistic for orders' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get('orders-statistic')
  public async ordersStatistic(): Promise<OrdersStatisticDto> {
    const result = await this.adminPanelService.getOrdersStatistic();
    return OrderStatisticMapper.toResponseItemDTO(result);
  }

  @ApiOperation({ description: 'Ban user by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard, IdMeGuard)
  @Patch('ban/:userId')
  public async banUser(@Param('userId') userId: number): Promise<BaseResDto> {
    await this.adminPanelService.banUser(userId);
    return { message: `User id ${userId} is banned!` };
  }

  @ApiOperation({ description: 'Unban user by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard, IdMeGuard)
  @Patch('unban/:userId')
  public async unbanUser(@Param('userId') userId: number): Promise<BaseResDto> {
    await this.adminPanelService.unbanUser(userId);
    return { message: `User id ${userId} is unbanned!` };
  }
}
