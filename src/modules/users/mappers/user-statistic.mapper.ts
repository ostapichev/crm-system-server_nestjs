import { UserStatisticResDto } from '../../admin-panel/dto/res/user-statistic.res.dto';

export class UserStatisticMapper {
  public static toResponseItemDTO(
    dto: UserStatisticResDto,
  ): UserStatisticResDto {
    return {
      orders: dto.orders,
      agree: dto.agree,
      in_work: dto.in_work,
      disagree: dto.disagree,
      dubbing: dto.dubbing,
    };
  }
}
