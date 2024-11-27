import { ListQueryDto } from '../req/list-query.dto';
import { OrderListItemResDto } from './order-list-item.res.dto';

export class OrderListResDto extends ListQueryDto {
  data: OrderListItemResDto[];
  total: number;
}
