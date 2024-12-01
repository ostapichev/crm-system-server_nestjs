import { UserListQueryDto } from '../../../auth/dto/req/user-list-query.dto';
import { UserResDto } from './user.res.dto';

export class UserListResDto extends UserListQueryDto {
  data: UserResDto[];
  total: number;
}
