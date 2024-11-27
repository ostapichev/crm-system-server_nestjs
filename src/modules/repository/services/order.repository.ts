import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { OrderEntity } from '../../../database/entities';
import { ListQueryDto } from '../../orders/dto/req/list-query.dto';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async getListAllOrders(
    query: ListQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const qb = this.createQueryBuilder('order');
    return await this.qbHelper(qb, query);
  }

  public async getOrder(
    orderId: number,
    em?: EntityManager,
  ): Promise<OrderEntity> {
    const repo = em ? em.getRepository(OrderEntity) : this;
    const qb = repo.createQueryBuilder('order');
    qb.where('order.id = :orderId', { orderId });
    return await qb.getOne();
  }

  private async qbHelper(
    qb: SelectQueryBuilder<OrderEntity>,
    query: ListQueryDto,
  ): Promise<[OrderEntity[], number]> {
    qb.leftJoinAndSelect('order.manager', 'manager');
    qb.orderBy('order.created_at', 'DESC');
    qb.take(query.limit);
    qb.skip((query.page - 1) * query.limit);
    return await qb.getManyAndCount();
  }
}
