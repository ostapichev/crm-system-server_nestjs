import { Transform } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { TableNameEnum, UserRoleEnum } from '../enums';
import { CommentsEntity } from './comments.entity';
import { CreateUpdateModel } from './models';
import { OrderEntity } from './order.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @Column({ length: 25 })
  name: string;

  @Column({ length: 25 })
  surname: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column({ length: 10, default: UserRoleEnum.MANAGER })
  role: UserRoleEnum;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  @Transform(({ value }) => Boolean(value))
  is_active: boolean;

  @OneToMany(() => CommentsEntity, (entity) => entity.user)
  comments?: CommentsEntity[];

  @OneToMany(() => OrderEntity, (entity) => entity.manager)
  orders?: OrderEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
