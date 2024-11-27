import { PickType } from '@nestjs/swagger';

import { BaseOrderReqDto } from './base-order.req.dto';

export class UpdateOrderReqDto extends PickType(BaseOrderReqDto, [
  'group',
  'name',
  'surname',
  'email',
  'phone',
  'age',
  'status',
  'sum',
  'alreadyPaid',
  'course',
  'format',
  'type',
]) {}
