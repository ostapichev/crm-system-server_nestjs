import { Injectable } from '@nestjs/common';

import { GroupEntity } from '../../../database/entities';
import { GroupRepository } from '../../repository/services/group.repository';
import { BaseGroupReqDto } from '../dto/req/base-group.req.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async getGroups(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  public async addGroup(dto: BaseGroupReqDto): Promise<GroupEntity> {
    return await this.groupRepository.save(dto);
  }
}
