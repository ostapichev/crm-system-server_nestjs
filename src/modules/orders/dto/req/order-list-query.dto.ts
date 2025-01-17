import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common';
import {
  CourseEnum,
  CourseFormatEnum,
  CourseTypeEnum,
  StatusEnum,
} from '../../../../database/enums';

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

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  @Type(() => String)
  name?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  @Type(() => String)
  surname?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  @Type(() => String)
  email?: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @IsOptional()
  @Type(() => String)
  phone?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  age?: number;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsEnum(CourseEnum)
  @IsOptional()
  @Type(() => String)
  course?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsEnum(CourseFormatEnum)
  @IsOptional()
  @Type(() => String)
  course_format?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsEnum(CourseTypeEnum)
  @IsOptional()
  @Type(() => String)
  course_type?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsEnum(StatusEnum)
  @IsOptional()
  @Type(() => String)
  status?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  group?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at_after?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at_before?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  manager?: number;
}
