import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { BaseGroupReqDto } from './dto/req/base-group.req.dto';
import { BaseGroupResDto } from './dto/res/base-group.res.dto';
import { GroupsService } from './groups/groups.service';
import { GroupMapper } from './mappers/group.mapper';

@ApiBearerAuth()
@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ description: 'get all groups' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getGroups(): Promise<BaseGroupResDto[]> {
    const entities = await this.groupsService.getGroups();
    return GroupMapper.toResponseListDTO(entities);
  }

  @ApiOperation({ description: 'Create group' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async addGroup(
    @Body() dto: BaseGroupReqDto,
  ): Promise<BaseGroupResDto> {
    return await this.groupsService.addGroup(dto);
  }
}
