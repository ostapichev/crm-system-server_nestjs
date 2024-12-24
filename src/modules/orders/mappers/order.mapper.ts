import { CommentEntity, OrderEntity } from '../../../database/entities';
import { OrderListQueryDto } from '../dto/req/order-list-query.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrderListResDto } from '../dto/res/order-list.res.dto';
import { OrderListItemResDto } from '../dto/res/order-list-item.res.dto';
import { OrderUpdateResDto } from '../dto/res/order-update-res.dto';

export class OrderMapper {
  public static toResponseListDTO(
    entities: OrderEntity[],
    total: number,
    query: OrderListQueryDto,
  ): OrderListResDto {
    return {
      data: entities.map(this.toResponseListItemDTO),
      total,
      ...query,
    };
  }

  public static toResponseListItemDTO(
    entity: OrderEntity,
  ): OrderListItemResDto {
    return {
      id: entity.id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      age: entity.age,
      course: entity.course,
      course_format: entity.course_format,
      type: entity.course_type,
      status: entity.status,
      sum: entity.sum,
      alreadyPaid: entity.alreadyPaid,
      created_at: entity.created_at,
      group_id: entity.group_id,
      manager: entity.manager,
      comments: entity.comments
        .sort(
          (item_1, item_2) =>
            new Date(item_2.created_at).getTime() -
            new Date(item_1.created_at).getTime(),
        )
        .map((comment: CommentEntity) => comment),
      msg: entity.msg,
      utm: entity.utm,
    };
  }

  public static toResponseDTO(entity: OrderEntity): OrderResDto {
    return {
      id: entity.id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      age: entity.age,
      course: entity.course,
      course_format: entity.course_format,
    };
  }

  public static toResponseUpdateDTO(entity: OrderEntity): OrderUpdateResDto {
    return {
      id: entity.id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      course: entity.course,
      course_format: entity.course_format,
      type: entity.course_type,
      status: entity.status,
      sum: entity.sum,
      alreadyPaid: entity.alreadyPaid,
      msg: entity.msg,
      utm: entity.utm,
    };
  }
}
