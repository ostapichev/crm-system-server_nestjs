import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums';
import { CreateUpdateModel } from './models';
import { UserEntity } from './user.entity';

@Index(['refreshToken'])
@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends CreateUpdateModel {
  @Column({ length: 500 })
  refreshToken: string;

  @Column('bigint')
  user_id: number;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
