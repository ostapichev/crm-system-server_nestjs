import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { OrderEntity } from '../../../database/entities';
import { GroupsService } from '../../groups/services/groups.service';
import { OrderRepository } from '../../repository/services/order.repository';
import { OrderListQueryDto } from '../dto/req/order-list-query.dto';
import { UpdateOrderReqDto } from '../dto/req/update-order.req.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly orderRepository: OrderRepository,
    private readonly groupsService: GroupsService,
  ) {}

  public async getListAllOrders(
    query: OrderListQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.getListAllOrders(query);
  }

  public async findOneOrder(orderId: number): Promise<OrderEntity> {
    return await this.getOrder(orderId);
  }

  public async updateOrder(
    orderId: number,
    dto: UpdateOrderReqDto,
  ): Promise<OrderEntity> {
    const order = await this.getOrder(orderId);
    const group = await this.groupsService.getGroupById(dto.group_id);
    if (!group) {
      throw new BadRequestException();
    }
    this.orderRepository.merge(order, dto);
    return await this.orderRepository.save(order);
  }

  private async getOrder(
    orderId: number,
    em?: EntityManager,
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.getOrder(orderId, em);
    if (!order) {
      throw new NotFoundException(`Order not found`);
    }
    return order;
  }
}
