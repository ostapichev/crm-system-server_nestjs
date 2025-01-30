import { UserResDto } from './user.res.dto';
import { UserListQueryDto } from './user-list-query.dto';

export class UserListResDto extends UserListQueryDto {
  data: UserResDto[];
  total: number;
}
