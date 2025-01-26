import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserRoleEnum } from '../../../database/enums';
import { OrdersStatisticDto } from '../../orders/dto/res/orders-statistic.dto';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AdminPanelService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UsersService,
  ) {}

  public async getOrdersStatistic(): Promise<OrdersStatisticDto> {
    return await this.orderRepository.getStatistic();
  }

  public async banUser(userId: number): Promise<void> {
    const user = await this.userService.getUser(userId);
    if (user.role === UserRoleEnum.ADMIN) {
      throw new ForbiddenException('You do not have permissions!');
    }
    if (!user.is_active) {
      throw new BadRequestException('The user is banned!');
    }
    await this.userRepository.update(user.id, {
      is_active: false,
    });
  }

  public async unbanUser(userId: number): Promise<void> {
    const user = await this.userService.getUser(userId);
    if (user.is_active) {
      throw new BadRequestException('The user is active!');
    }
    await this.userRepository.update(user.id, {
      is_active: true,
    });
  }
}
