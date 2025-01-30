import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common';

export class ActivateTokenResDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS...' })
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  activateToken: string;

  @ApiProperty({
    example:
      "Link for activate user Smith created!. Push on the button 'copy to clipboard', user id: 2.",
  })
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  message: string;
}
