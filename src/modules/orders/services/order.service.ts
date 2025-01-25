import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { CommentEntity, OrderEntity } from '../../../database/entities';
import { StatusEnum } from '../../../database/enums';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { GroupsService } from '../../groups/services/groups.service';
import { CommentRepository } from '../../repository/services/comment.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { UsersService } from '../../users/services/users.service';
import { BaseCommentReqDto } from '../dto/req/base-comment.req.dto';
import { CreateUpdateOrderReqDto } from '../dto/req/create-update-order-req.dto';
import { OrderListQueryDto } from '../dto/req/order-list-query.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectEntityManager()
    private readonly userService: UsersService,
    private readonly entityManager: EntityManager,
    private readonly orderRepository: OrderRepository,
    private readonly groupsService: GroupsService,
    private readonly commentRepository: CommentRepository,
  ) {}

  public async createOrder(dto: CreateUpdateOrderReqDto): Promise<OrderEntity> {
    return await this.entityManager.transaction(
      'REPEATABLE READ',
      async (em) => {
        const orderRepository = em.getRepository(OrderEntity);
        return await orderRepository.save(
          this.orderRepository.create({
            ...dto,
            status: StatusEnum.NEW,
          }),
        );
      },
    );
  }

  public async getListAllOrders(
    query: OrderListQueryDto,
  ): Promise<[OrderEntity[], number]> {
    return await this.orderRepository.getListAllOrders(query);
  }

  public async findOneOrder(orderId: number): Promise<OrderEntity> {
    return await this.findOrder(orderId);
  }

  public async updateOrder(
    orderId: number,
    dto: CreateUpdateOrderReqDto,
  ): Promise<OrderEntity> {
    const order = await this.findOrder(orderId);
    const group = await this.groupsService.getGroupById(dto.group_id);
    if (!group) {
      throw new BadRequestException();
    }
    if (dto.status === StatusEnum.NEW) {
      order.manager_id = null;
      order.manager = null;
      this.orderRepository.merge(order, dto);
      return await this.orderRepository.save(order);
    }
    this.orderRepository.merge(order, dto);
    return await this.orderRepository.save(order);
  }

  public async getListCommentsByOrderId(
    orderId: number,
  ): Promise<CommentEntity[]> {
    await this.findOrder(orderId);
    return await this.commentRepository.find({ where: { order_id: orderId } });
  }

  public async createComment(
    dto: BaseCommentReqDto,
    orderId: number,
    userData: IUserData,
  ): Promise<CommentEntity> {
    return await this.entityManager.transaction(
      'REPEATABLE READ',
      async (em) => {
        const user = await this.userService.getUser(userData.userId);
        const commentRepository = em.getRepository(CommentEntity);
        await this.findOrder(orderId);
        await this.orderRepository.update(orderId, {
          status: StatusEnum.IN_WORK,
          manager_id: user.id,
        });
        return await commentRepository.save(
          this.commentRepository.create({
            order_id: orderId,
            manager_id: user.id,
            ...dto,
          }),
        );
      },
    );
  }

  private async findOrder(
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
