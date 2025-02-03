import { UserEntity } from '../../../database/entities';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserResItemDto } from '../dto/res/user.item.res.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserListResDto } from '../dto/res/user-list.res.dto';
import { UserListQueryDto } from '../dto/res/user-list-query.dto';

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
      last_login: data.last_login,
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
      last_login: data.last_login,
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
      last_login: user.last_login,
      is_active: user.is_active,
    };
  }
}
