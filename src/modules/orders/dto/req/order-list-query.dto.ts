import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common';

export class OrderListQueryDto {
  @IsInt()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  limit: number = 25;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  @Type(() => String)
  search?: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @Type(() => String)
  sorting_by: string = '-id';
}
