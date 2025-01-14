import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GroupEntity } from '../../../database/entities';
import { GroupRepository } from '../../repository/services/group.repository';
import { BaseGroupReqDto } from '../dto/req/base-group.req.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly groupRepository: GroupRepository) {}

  public async getGroups(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  public async getGroupById(groupId: number): Promise<GroupEntity> {
    return await this.findGroup(groupId);
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

  private async findGroup(groupId: number): Promise<GroupEntity> {
    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found`);
    }
    return group;
  }
}
