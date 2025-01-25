import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Buffer } from 'buffer';
import * as ExcelJS from 'exceljs';
import Cell from 'exceljs/index';
import { PassThrough } from 'stream';
import { EntityManager } from 'typeorm';

import { CommentEntity, OrderEntity } from '../../../database/entities';
import { StatusEnum } from '../../../database/enums';
import { AdminPanelService } from '../../admin-panel/services/admin_panel.service';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { GroupsService } from '../../groups/services/groups.service';
import { CommentRepository } from '../../repository/services/comment.repository';
import { OrderRepository } from '../../repository/services/order.repository';
import { BaseCommentReqDto } from '../dto/req/base-comment.req.dto';
import { CreateUpdateOrderReqDto } from '../dto/req/create-update-order-req.dto';
import { OrderListQueryDto } from '../dto/req/order-list-query.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly orderRepository: OrderRepository,
    private readonly groupsService: GroupsService,
    private readonly commentRepository: CommentRepository,
    private readonly adminPanelService: AdminPanelService,
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
        const user = await this.adminPanelService.getUser(userData.userId);
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

  async generateExcel(data: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    worksheet.columns = [
      { header: 'id', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Email', key: 'email', width: 35 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Age', key: 'age', width: 5 },
      { header: 'Course', key: 'course', width: 10 },
      { header: 'Course Format', key: 'course_format', width: 15 },
      { header: 'Course Type', key: 'course_type', width: 15 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Sum', key: 'sum', width: 10 },
      { header: 'Already paid', key: 'alreadyPaid', width: 15 },
      { header: 'Created', key: 'created_at', width: 13 },
      { header: 'group', key: 'group', width: 10 },
      { header: 'manager', key: 'manager', width: 13 },
    ];
    worksheet.getRow(1).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colIndex) => {
      if (colIndex >= 1 || colIndex <= 15) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4CAF50' },
        };
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFFFF' },
          size: 12,
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      }
    });
    worksheet.getRow(1).height = 25;
    data.forEach((item: OrderEntity) => {
      const row = worksheet.addRow({
        id: item.id,
        name: item.name,
        surname: item.surname,
        email: item.email,
        phone: item.phone,
        age: item.age,
        course: item.course,
        course_format: item.course_format,
        course_type: item.course_type,
        status: item.status,
        sum: item.sum,
        alreadyPaid: item.alreadyPaid,
        created_at: item.created_at,
        group: item.group?.name || 'no group',
        manager: item.manager?.name || 'no manager',
      });
      row.alignment = { vertical: 'middle', horizontal: 'center' };
      row.eachCell({ includeEmpty: true }, (cell: Cell, colIndex: number) => {
        if (colIndex >= 1 || colIndex <= 15) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
      });
      row.height = 20;
    });
    const stream = new PassThrough();
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    await workbook.xlsx.write(stream);
    stream.end();
    return Buffer.concat(chunks);
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
