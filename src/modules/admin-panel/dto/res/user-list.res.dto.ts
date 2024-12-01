import { ListQueryDto } from '../../../orders/dto/req/list-query.dto';
import { UserResDto } from './user.res.dto';

export class UserListResDto extends ListQueryDto {
  data: UserResDto[];
  total: number;
}
