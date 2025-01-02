import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  Length,
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

export class BaseOrderReqDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  group_id?: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  surname?: string;

  @ApiProperty({ example: 'smith@mail.net' })
  @IsEmail()
  @Length(5, 100)
  @Transform(TransformHelper.trim)
  @Type(() => IsEmail)
  email?: string;

  @ApiProperty({ example: '380981234567' })
  @IsString()
  @Length(12)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  phone?: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(14)
  @Max(70)
  @Type(() => Number)
  age?: number;

  @ApiProperty({ example: 20000 })
  @IsEnum(StatusEnum)
  @Type(() => IsEnum)
  status?: StatusEnum;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(1)
  @Max(1000000)
  @Type(() => Number)
  sum?: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(1)
  @Max(1000000)
  @Type(() => Number)
  alreadyPaid?: number;

  @ApiProperty({ example: CourseEnum.PCX })
  @IsEnum(CourseEnum)
  @Type(() => IsEnum)
  course?: CourseEnum;

  @ApiProperty({ example: CourseFormatEnum.ONLINE })
  @IsEnum(CourseFormatEnum)
  @Type(() => IsEnum)
  course_format?: CourseFormatEnum;

  @ApiProperty({ example: CourseTypeEnum.VIP })
  @IsEnum(CourseTypeEnum)
  @Type(() => IsEnum)
  course_type?: CourseTypeEnum;
}
