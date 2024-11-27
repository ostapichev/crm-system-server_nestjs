import { Column, Entity, OneToMany } from 'typeorm';

import { TableNameEnum } from '../enums';
import { CreateUpdateModel } from './models';
import { OrderEntity } from './order.entity';

@Entity(TableNameEnum.GROUPS)
export class GroupEntity extends CreateUpdateModel {
  @Column({ length: 35, unique: true })
  name: string;

  @OneToMany(() => OrderEntity, (entity) => entity.group)
  orders?: OrderEntity[];
}
