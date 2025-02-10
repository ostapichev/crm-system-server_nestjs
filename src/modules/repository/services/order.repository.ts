import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Brackets,
  DataSource,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { OrderEntity } from '../../../database/entities';
import { OrdersStatisticDto } from '../../admin-panel/dto/res/orders-statistic.dto';
import { columns } from '../../orders/constants/columns';
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
    qb.leftJoinAndSelect('order.manager', 'users_auth');
    qb.leftJoinAndSelect('order.comments', 'comments');
    qb.leftJoinAndSelect('comments.user', 'comment_user');
    return await qb.getOne();
  }

  public async getStatistic(userId?: number): Promise<OrdersStatisticDto> {
    const baseQuery = this.createQueryBuilder('order');
    if (userId) {
      baseQuery.andWhere('order.manager_id = :userId', { userId });
    }
    const orders = await baseQuery.getCount();
    const agree = this.createQueryBuilder('order')
      .where('order.status = :agree', { agree: 'agree' })
      .andWhere(userId ? 'order.manager_id = :userId' : '1=1', { userId })
      .getCount();
    const in_work = this.createQueryBuilder('order')
      .where('order.status = :in_work', { in_work: 'in_work' })
      .andWhere(userId ? 'order.manager_id = :userId' : '1=1', { userId })
      .getCount();
    const disagree = this.createQueryBuilder('order')
      .where('order.status = :disagree', { disagree: 'disagree' })
      .andWhere(userId ? 'order.manager_id = :userId' : '1=1', { userId })
      .getCount();
    const dubbing = this.createQueryBuilder('order')
      .where('order.status = :dubbing', { dubbing: 'dubbing' })
      .andWhere(userId ? 'order.manager_id = :userId' : '1=1', { userId })
      .getCount();
    const news = this.createQueryBuilder('order')
      .where('order.status = :new', { new: 'new' })
      .andWhere(userId ? 'order.manager_id = :userId' : '1=1', { userId })
      .getCount();
    const status_null = this.createQueryBuilder('order')
      .where('order.status IS NULL', { null: null })
      .andWhere(userId ? 'order.manager_id = :userId' : '1=1', { userId })
      .getCount();
    return {
      orders,
      agree: await agree,
      in_work: await in_work,
      disagree: await disagree,
      dubbing: await dubbing,
      news: await news,
      status_null: await status_null,
    };
  }

  private async qbHelper(
    qb: SelectQueryBuilder<OrderEntity>,
    query: OrderListQueryDto,
  ): Promise<[OrderEntity[], number]> {
    const {
      limit,
      sorting_by,
      page,
      name,
      surname,
      email,
      phone,
      age,
      course,
      course_format,
      course_type,
      status,
      group,
      created_at_after,
      created_at_before,
      manager,
    } = query;
    const isDescending = sorting_by.startsWith('-');
    const column = isDescending ? sorting_by.slice(1) : sorting_by;
    if (!columns.includes(column)) {
      throw new BadRequestException(`Unsupported sorting by '${sorting_by}'`);
    }
    if (
      name ||
      surname ||
      email ||
      phone ||
      age ||
      course ||
      course_format ||
      course_type ||
      status ||
      group ||
      created_at_after ||
      created_at_before ||
      manager
    ) {
      qb.where(
        new Brackets((qb) => {
          if (name) {
            qb.andWhere('LOWER(order.name) LIKE :name', {
              name: `%${name}%`,
            });
          }
          if (surname) {
            qb.andWhere('LOWER(order.surname) LIKE :surname', {
              surname: `%${surname}%`,
            });
          }
          if (email) {
            qb.andWhere('LOWER(order.email) LIKE :email', {
              email: `%${email}%`,
            });
          }
          if (phone) {
            qb.andWhere('LOWER(order.phone) LIKE :phone', {
              phone: `%${phone}%`,
            });
          }
          if (age) {
            qb.andWhere('order.age LIKE :age', { age });
          }
          if (course) {
            qb.andWhere('order.course LIKE :course', { course });
          }
          if (course_format) {
            qb.andWhere('LOWER(order.course_format) LIKE :course_format', {
              course_format,
            });
          }
          if (course_type) {
            qb.andWhere('LOWER(order.course_type) LIKE :course_type', {
              course_type,
            });
          }
          if (status) {
            qb.andWhere('LOWER(order.status) LIKE :status', { status });
          }
          if (group) {
            qb.andWhere('order.group_id LIKE :group_id', {
              group_id: `${group}`,
            });
          }
          if (created_at_after) {
            qb.andWhere('order.created_at > :created_at_after', {
              created_at_after,
            });
          }
          if (created_at_before) {
            qb.andWhere('order.created_at < :created_at_before', {
              created_at_before,
            });
          }
          if (manager) {
            qb.andWhere('order.manager_id LIKE :manager_id', {
              manager_id: `${manager}`,
            });
          }
        }),
      );
    }
    qb.orderBy(`order.${column}`, isDescending ? 'DESC' : 'ASC');
    qb.leftJoinAndSelect('order.group', 'group');
    qb.leftJoinAndSelect('order.manager', 'users_auth');
    qb.leftJoinAndSelect('order.comments', 'comments');
    qb.leftJoinAndSelect('comments.user', 'comment_user');
    qb.take(limit).skip((page - 1) * limit);
    return await qb.getManyAndCount();
  }
}
