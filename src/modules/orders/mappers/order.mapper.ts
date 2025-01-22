import { CommentEntity, OrderEntity } from '../../../database/entities';
import { OrderListQueryDto } from '../dto/req/order-list-query.dto';
import { CreateUpdateOrderResDto } from '../dto/res/create-update-order-res.dto';
import { OrderListResDto } from '../dto/res/order-list.res.dto';
import { OrderListItemResDto } from '../dto/res/order-list-item.res.dto';

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
      id: Number(entity.id),
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      age: Number(entity.age),
      course: entity.course,
      course_format: entity.course_format,
      course_type: entity.course_type,
      status: entity.status,
      sum: Number(entity.sum),
      alreadyPaid: Number(entity.alreadyPaid),
      created_at: entity.created_at,
      group_id: Number(entity.group_id),
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

  public static toResponseCreateUpdateItemDTO(
    entity: OrderEntity,
  ): CreateUpdateOrderResDto {
    return {
      id: entity.id,
      group: Number(entity.group_id),
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      age: Number(entity.age),
      course: entity.course,
      course_format: entity.course_format,
      course_type: entity.course_type,
      status: entity.status,
      sum: Number(entity.sum),
      alreadyPaid: Number(entity.alreadyPaid),
    };
  }
}
