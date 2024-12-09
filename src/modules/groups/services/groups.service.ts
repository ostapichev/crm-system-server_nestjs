import { ConflictException, Injectable } from '@nestjs/common';

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
    await this.isGroupExistOrThrow(dto.name);
    return await this.groupRepository.save(dto);
  }

  private async isGroupExistOrThrow(name: string): Promise<void> {
    const group = await this.groupRepository.findOneBy({ name });
    if (group) {
      throw new ConflictException('Group already exists');
    }
  }
}
