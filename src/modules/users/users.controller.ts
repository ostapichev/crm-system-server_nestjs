import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UserEntity } from '../../database/entities';
import { UserStatisticResDto } from '../admin-panel/dto/res/user-statistic.res.dto';
import { AdminGuard } from '../admin-panel/guards/admin.guard';
import { UserResItemDto } from './dto/res/user.item.res.dto';
import { UserListResDto } from './dto/res/user-list.res.dto';
import { UserListQueryDto } from './dto/res/user-list-query.dto';
import { UserMapper } from './mappers/user.mapper';
import { UserStatisticMapper } from './mappers/user-statistic.mapper';
import { UsersService } from './services/users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ description: 'Get list all users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get()
  public async findAllUsers(
    @Query() query: UserListQueryDto,
  ): Promise<UserListResDto> {
    const [entities, total] = await this.userService.findAllUsers(query);
    const users = plainToInstance(UserEntity, entities);
    return UserMapper.toResponseListDTO(users, total, query);
  }

  @ApiOperation({ description: 'Get user statistic' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('statistic/:userId')
  public async statisticUser(
    @Param('userId') userId: number,
  ): Promise<UserStatisticResDto> {
    const result = await this.userService.getUserStatistic(userId);
    return UserStatisticMapper.toResponseItemDTO(result);
  }

  @ApiOperation({ description: 'Get user by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get(':userId')
  public async findUser(
    @Param('userId') userId: number,
  ): Promise<UserResItemDto> {
    const result = await this.userService.getUser(userId);
    return UserMapper.toResponseItemDTO(result);
  }
}
