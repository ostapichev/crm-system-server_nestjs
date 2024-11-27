import { UserEntity } from '../../../database/entities';
import { UserListResDto } from '../../admin-panel/dto/res/user-list.res.dto';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListQueryDto } from '../../orders/dto/req/list-query.dto';
import { UserResItemDto } from '../dto/res/user.item.res.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserResPublicDto } from '../dto/res/user.res-public.dto';

export class UserMapper {
  public static toResponseListDTO(
    entities: UserEntity[],
    total: number,
    query: ListQueryDto,
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
      is_active: true,
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
      is_active: true,
      created_at: data.created_at,
      last_login: data.last_login,
    };
  }

  public static toResponsePublicDTO(data: UserEntity): UserResPublicDto {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      role: data.role,
      is_active: true,
      created_at: data.created_at,
      last_login: data.last_login,
    };
  }

  public static toIUserData(user: UserEntity, payload: IJwtPayload): IUserData {
    return {
      userId: payload.userId,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      is_active: true,
      last_login: user.last_login,
    };
  }
}