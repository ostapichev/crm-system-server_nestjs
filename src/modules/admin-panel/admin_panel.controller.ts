import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
import { AuthService } from '../auth/services/auth.service';
import { ListQueryDto } from '../orders/dto/req/list-query.dto';
import { UserListResDto } from './dto/res/user-list.res.dto';
import { AdminGuard } from './guards/admin.guard';
import { IdMeGuard } from './guards/id-me.guard';
import { UserMapper } from './mappers/user.mapper';
import { AdminPanelService } from './services/admin_panel.service';

@ApiBearerAuth()
@ApiTags('Admin Panel')
@Controller('admin')
export class AdminPanelController {
  constructor(
    private readonly adminPanelService: AdminPanelService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ description: 'Get list all users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AdminGuard)
  @Get()
  public async findAllUsers(
    @Query() query: ListQueryDto,
  ): Promise<UserListResDto> {
    const [entities, total] = await this.adminPanelService.findAllUsers(query);
    return UserMapper.toResponseListDTO(entities, total, query);
  }

  @ApiOperation({ description: 'Create new user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AdminGuard)
  @Post('create')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @ApiOperation({ description: 'Ban user by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AdminGuard, IdMeGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('ban/:userId')
  public async banUser(@Param('userId') userId: number): Promise<void> {
    await this.adminPanelService.banUser(userId);
  }

  @ApiOperation({ description: 'Unban user by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AdminGuard, IdMeGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('unban/:userId')
  public async unbanUser(@Param('userId') userId: number): Promise<void> {
    await this.adminPanelService.unbanUser(userId);
  }
}
