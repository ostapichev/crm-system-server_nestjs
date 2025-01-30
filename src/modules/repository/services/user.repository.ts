import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities';
import { UserListQueryDto } from '../../users/dto/res/user-list-query.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getListAllUsers(
    query: UserListQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    qb.orderBy('user.id', 'DESC');
    qb.andWhere('user.role != :role', { role: 'admin' });
    if (query.search) {
      qb.andWhere('CONCAT(user.name, user.email) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip((query.page - 1) * query.limit);
    return await qb.getManyAndCount();
  }

  public async getByIdUser(userId: number): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user');
    qb.where('user.id = :userId', { userId });
    return await qb.getOne();
  }
}
