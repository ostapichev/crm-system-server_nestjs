import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from '../../../database/entities';
import { UserListQueryDto } from '../../auth/dto/req/user-list-query.dto';
import { OrdersStatisticDto } from '../../orders/dto/res/orders-statistic.dto';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';

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

  public async getUserStatistic(userId: number): Promise<OrdersStatisticDto> {
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
