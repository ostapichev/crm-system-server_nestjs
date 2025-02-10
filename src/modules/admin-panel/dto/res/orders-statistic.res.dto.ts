import { PickType } from '@nestjs/swagger';

import { StatisticResDto } from './statistic.res.dto';

export class OrdersStatisticResDto extends PickType(StatisticResDto, [
  'orders',
  'news',
  'agree',
  'disagree',
  'in_work',
  'dubbing',
  'status_null',
]) {}
