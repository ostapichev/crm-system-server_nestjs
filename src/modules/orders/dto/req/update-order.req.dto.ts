import { PickType } from '@nestjs/swagger';

import { BaseOrderReqDto } from './base-order.req.dto';

export class UpdateOrderReqDto extends PickType(BaseOrderReqDto, [
  'group_id',
  'name',
  'surname',
  'email',
  'phone',
  'age',
  'course',
  'course_format',
  'course_type',
  'status',
  'sum',
  'alreadyPaid',
]) {}
