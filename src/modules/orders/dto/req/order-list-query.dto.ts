import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common';
import { OrderColumnsEnum } from '../../enums/column.enum';
import { OrderByEnum } from '../../enums/order-by.enum';

export class OrderListQueryDto {
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 25;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  @Type(() => String)
  search?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsEnum(OrderByEnum)
  @IsOptional()
  @Type(() => IsEnum)
  order_by?: OrderByEnum = OrderByEnum.DESC;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsEnum(OrderColumnsEnum)
  @IsOptional()
  @Type(() => IsEnum)
  sorting_by?: OrderColumnsEnum = OrderColumnsEnum.ID;
}
