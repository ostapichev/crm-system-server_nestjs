import { PickType } from '@nestjs/swagger';

import { StatisticResDto } from './statistic.res.dto';

export class UserStatisticResDto extends PickType(StatisticResDto, [
  'orders',
  'agree',
  'disagree',
  'in_work',
  'dubbing',
]) {}
