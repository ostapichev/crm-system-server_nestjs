import { OrdersStatisticDto } from '../dto/res/orders-statistic.dto';

export class OrderStatisticMapper {
  public static toResponseItemDTO(dto: OrdersStatisticDto): OrdersStatisticDto {
    return {
      orders: dto.orders,
      agree: dto.agree,
      in_work: dto.in_work,
      disagree: dto.disagree,
      dubbing: dto.dubbing,
      news: dto.news,
    };
  }
}
