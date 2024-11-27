import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseUserReqDto } from '../../../users/dto/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'name',
  'surname',
  'email',
  'password',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
