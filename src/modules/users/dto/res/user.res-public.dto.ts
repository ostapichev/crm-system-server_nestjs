import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res.dto';

export class UserResPublicDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'surname',
  'email',
  'role',
  'is_active',
  'created_at',
]) {}
