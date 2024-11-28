import { PickType } from '@nestjs/swagger';

import { BaseOrderResDto } from './base-order.res.dto';

export class OrderUpdateResDto extends PickType(BaseOrderResDto, [
  'id',
  'name',
  'surname',
  'email',
  'phone',
  'course',
  'course_format',
  'type',
  'status',
  'sum',
  'alreadyPaid',
  'msg',
  'utm',
]) {}
