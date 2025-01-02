import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OrderEntity } from '../../../database/entities';
import { OrderRepository } from '../../repository/services/order.repository';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly orderRepository: OrderRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user;
    const { orderId } = request.params;
    let order: OrderEntity;
    if (orderId) {
      order = await this.orderRepository.findOneBy({ id: orderId });
      if (!order) {
        throw new NotFoundException('Order not found!');
      }
    }
    return order.manager_id === userId || !order.manager_id;
  }
}
