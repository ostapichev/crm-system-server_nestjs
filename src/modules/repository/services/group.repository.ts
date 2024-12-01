import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { GroupEntity } from '../../../database/entities';

@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(GroupEntity, dataSource.manager);
  }
}
