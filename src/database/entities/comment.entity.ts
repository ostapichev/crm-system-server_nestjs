import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums';
import { CreateUpdateModel } from './models';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.COMMENTS)
export class CommentEntity extends CreateUpdateModel {
  @Column('text')
  text: string;

  @Column('bigint')
  order_id: number;
  @ManyToOne(() => OrderEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column('bigint')
  manager_id: number;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'manager_id' })
  user: UserEntity;
}
