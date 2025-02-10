import { OrdersStatisticResDto } from '../dto/res/orders-statistic.res.dto';

export class OrderStatisticMapper {
  public static toResponseItemDTO(
    dto: OrdersStatisticResDto,
  ): OrdersStatisticResDto {
    return {
      orders: dto.orders,
      agree: dto.agree,
      in_work: dto.in_work,
      disagree: dto.disagree,
      dubbing: dto.dubbing,
      news: dto.news,
      status_null: dto.status_null,
    };
  }
}
