import { UserEntity } from '../../../database/entities';
import { UserListQueryDto } from '../../auth/dto/req/user-list-query.dto';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserResItemDto } from '../dto/res/user.item.res.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserListResDto } from '../dto/res/user-list.res.dto';

export class UserMapper {
  public static toResponseListDTO(
    entities: UserEntity[],
    total: number,
    query: UserListQueryDto,
  ): UserListResDto {
    return {
      data: entities.map(this.toResponseDTO),
      total,
      ...query,
    };
  }

  public static toResponseDTO(data: UserEntity): UserResDto {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role,
      is_active: data.is_active,
      created_at: data.created_at,
    };
  }

  public static toResponseItemDTO(data: UserEntity): UserResItemDto {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role,
      is_active: data.is_active,
      created_at: data.created_at,
    };
  }

  public static toIUserData(user: UserEntity, payload: IJwtPayload): IUserData {
    return {
      userId: payload.userId,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    };
  }
}
