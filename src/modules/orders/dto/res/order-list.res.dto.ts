import { OrderListQueryDto } from '../req/order-list-query.dto';
import { OrderListItemResDto } from './order-list-item.res.dto';

export class OrderListResDto extends OrderListQueryDto {
  data: OrderListItemResDto[];
  total: number;
}
