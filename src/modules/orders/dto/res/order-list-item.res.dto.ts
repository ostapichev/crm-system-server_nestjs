import { PickType } from '@nestjs/swagger';

import { BaseOrderResDto } from './base-order.res.dto';

export class OrderListItemResDto extends PickType(BaseOrderResDto, [
  'id',
  'name',
  'surname',
  'email',
  'phone',
  'age',
  'course',
]) {}
