import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common';

export class BaseCommentReqDto {
  @ApiProperty({ example: 'Fusce consequat. Nulla nisl. Nunc nisl.' })
  @IsString()
  @Length(2, 500)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  text: string;
}
