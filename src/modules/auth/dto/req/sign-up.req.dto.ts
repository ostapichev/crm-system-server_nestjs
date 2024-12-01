import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../admin-panel/dto/req/base-user.req.dto';

export class SignUpReqDto extends PickType(BaseUserReqDto, [
  'name',
  'surname',
  'email',
]) {}
