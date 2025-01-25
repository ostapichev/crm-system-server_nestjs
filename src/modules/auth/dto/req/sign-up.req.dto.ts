import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../users/dto/req/base-user.req.dto';

export class SignUpReqDto extends PickType(BaseUserReqDto, [
  'name',
  'surname',
  'email',
]) {}
