import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import {
  CourseEnum,
  CourseFormatEnum,
  CourseTypeEnum,
  StatusEnum,
  TableNameEnum,
} from '../enums';
import { CommentsEntity } from './comments.entity';
import { GroupEntity } from './group.entity';
import { CreateUpdateModel } from './models';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ORDERS)
export class OrderEntity extends CreateUpdateModel {
  @Column({ length: 25, nullable: true })
  name?: string;

  @Column({ length: 25, nullable: true })
  surname?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ length: 12, nullable: true })
  phone?: string;

  @Column('int', { default: 0 })
  age?: number;

  @Column({ length: 10, nullable: true })
  course?: CourseEnum;

  @Column({ length: 15, nullable: true })
  course_format?: CourseFormatEnum;

  @Column({ length: 100, nullable: true })
  course_type?: CourseTypeEnum;

  @Column({ length: 15, nullable: true })
  status?: StatusEnum;

  @Column('bigint', { nullable: true })
  sum?: number;

  @Column('bigint', { nullable: true })
  alreadyPaid?: number;

  @Column({ length: 100, nullable: true })
  utm?: string;

  @Column({ length: 100, nullable: true })
  msg?: string;

  @Column('bigint', { nullable: true })
  group_id?: number;
  @ManyToOne(() => GroupEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'group_id' })
  group?: GroupEntity;

  @Column('bigint', { nullable: true })
  manager_id?: number;
  @ManyToOne(() => UserEntity, (entity) => entity.orders)
  @JoinColumn({ name: 'manager_id' })
  manager?: UserEntity;

  @OneToMany(() => CommentsEntity, (entity) => entity.order)
  comments?: CommentsEntity[];
}
