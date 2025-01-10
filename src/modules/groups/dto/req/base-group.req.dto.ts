import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common';

export class BaseGroupReqDto {
  @ApiProperty({ example: 'dec-2022' })
  @IsString()
  @Length(8)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Type(() => String)
  name?: string;
}
