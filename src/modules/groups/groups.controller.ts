import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { BaseGroupReqDto } from './dto/req/base-group.req.dto';
import { BaseGroupResDto } from './dto/res/base-group.res.dto';
import { GroupMapper } from './mappers/group.mapper';
import { GroupsService } from './services/groups.service';

@ApiBearerAuth()
@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ description: 'get all groups' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  public async getGroups(): Promise<BaseGroupResDto[]> {
    const entities = await this.groupsService.getGroups();
    return GroupMapper.toResponseListDTO(entities);
  }

  @ApiOperation({ description: 'get a group by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get(':groupId')
  public async getGroupById(
    @Param('groupId') groupId: number,
  ): Promise<BaseGroupResDto> {
    const result = await this.groupsService.getGroupById(groupId);
    return GroupMapper.toResponseItemDTO(result);
  }

  @ApiOperation({ description: 'Create group' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  public async addGroup(
    @Body() dto: BaseGroupReqDto,
  ): Promise<BaseGroupResDto> {
    return await this.groupsService.addGroup(dto);
  }
}
