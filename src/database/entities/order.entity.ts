import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import {
  CourseEnum,
  FormatEnum,
  StatusEnum,
  TableNameEnum,
  TypeEnum,
} from '../enums';
import { CommentsEntity } from './comments.entity';
import { GroupEntity } from './group.entity';
import { CreateUpdateModel } from './models';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ORDERS)
export class OrderEntity extends CreateUpdateModel {
  @Column({ length: 50, default: '' })
  name: string;

  @Column({ length: 25, default: '' })
  surname: string;

  @Column({ length: 100, default: '', unique: true })
  email?: string;

  @Column({ length: 12, default: '' })
  phone?: string;

  @Column('int', { default: 0 })
  age?: number;

  @Column({ length: 10, default: '' })
  course?: CourseEnum;

  @Column({ length: 15, default: '' })
  course_format?: FormatEnum;

  @Column({ length: 100, default: '' })
  course_type?: TypeEnum;

  @Column({ length: 15, default: '' })
  status?: StatusEnum;

  @Column('bigint', { nullable: true })
  sum?: number;

  @Column('bigint', { nullable: true })
  alreadyPaid?: number;

  @Column({ length: 100, default: '' })
  utm?: string;

  @Column({ length: 100, default: '' })
  msg?: string;

  @Column('bigint', { nullable: true })
  group_id?: number;
  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'group_id' })
  group?: GroupEntity;

  @Column('bigint', { nullable: true })
  manager_id: number;
  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'manager_id' })
  manager?: UserEntity;

  @OneToMany(() => CommentsEntity, (entity) => entity.order)
  comments?: CommentsEntity[];
}
