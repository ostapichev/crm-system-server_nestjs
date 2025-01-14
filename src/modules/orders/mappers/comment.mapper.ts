import { CommentEntity } from '../../../database/entities';
import { BaseCommentResDto } from '../dto/res/base-comment.res.dto';

export class CommentMapper {
  public static toResponseListDTO(
    entities: CommentEntity[],
  ): BaseCommentResDto[] {
    return entities.map(this.toResponseListItemDTO);
  }

  public static toResponseListItemDTO(
    entity: CommentEntity,
  ): BaseCommentResDto {
    return {
      id: Number(entity.id),
      text: entity?.text,
      order_id: entity.order_id,
      manager_id: entity.manager_id,
      created_at: entity.created_at,
    };
  }
}
