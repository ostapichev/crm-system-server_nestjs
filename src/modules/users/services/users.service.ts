import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from '../../../database/entities';
import { UserStatisticResDto } from '../../admin-panel/dto/res/user-statistic.res.dto';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserListQueryDto } from '../dto/res/user-list-query.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async findAllUsers(
    query: UserListQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.getListAllUsers(query);
  }

  public async getUserStatistic(userId: number): Promise<UserStatisticResDto> {
    const user = await this.getUser(userId);
    return await this.orderRepository.getStatistic(user.id);
  }

  public async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
}
