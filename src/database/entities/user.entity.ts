import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

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

  @Column({ length: 10, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Column('boolean', { default: false })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: '' })
  last_login?: Date;

  @OneToMany(() => CommentsEntity, (entity) => entity.user)
  comments?: CommentsEntity[];

  @OneToMany(() => OrderEntity, (entity) => entity.manager)
  orders?: OrderEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
