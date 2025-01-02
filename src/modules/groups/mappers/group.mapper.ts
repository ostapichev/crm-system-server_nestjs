import { GroupEntity } from '../../../database/entities';
import { BaseGroupResDto } from '../dto/res/base-group.res.dto';

export class GroupMapper {
  public static toResponseListDTO(entities: GroupEntity[]): BaseGroupResDto[] {
    return entities.map(this.toResponseListItemDTO);
  }

  public static toResponseListItemDTO(entity: GroupEntity): BaseGroupResDto {
    return {
      id: Number(entity.id),
      name: entity.name,
    };
  }
}
