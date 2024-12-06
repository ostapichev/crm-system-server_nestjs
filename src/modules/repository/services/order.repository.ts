import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { OrderEntity } from '../../../database/entities';
import { columns } from '../../constants/columns';
import { OrderListQueryDto } from '../../orders/dto/req/order-list-query.dto';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  public async getListAllOrders(
    query: OrderListQueryDto,
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
    query: OrderListQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const { limit, sorting_by, page } = query;
    const isDescending = sorting_by.startsWith('-');
    const column = isDescending ? sorting_by.slice(1) : sorting_by;
    if (!columns.includes(column)) {
      throw new BadRequestException(`Unsupported sorting by '${sorting_by}'`);
    }
    qb.orderBy(`order.${column}`, isDescending ? 'DESC' : 'ASC');
    qb.take(limit).skip((page - 1) * limit);
    return await qb.getManyAndCount();
  }
}
