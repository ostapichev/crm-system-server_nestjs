import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
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
  @IsOptional()
  @Type(() => Number)
  group_id?: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Matches(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Matches(/^[a-zA-Zа-яА-яёЁіІїЇ]{2,20}$/)
  @Type(() => String)
  surname?: string;

  @ApiProperty({ example: 'smith@mail.net' })
  @IsEmail()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Type(() => IsEmail)
  email?: string;

  @ApiProperty({ example: '380981234567' })
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Matches(/^\d{12}$/)
  @Type(() => String)
  phone?: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsOptional()
  @Min(16)
  @Max(90)
  @Type(() => Number)
  age?: number;

  @ApiProperty({ example: StatusEnum.NEW })
  @IsEnum(StatusEnum)
  @IsOptional()
  @Type(() => IsEnum)
  status?: StatusEnum;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sum?: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  alreadyPaid?: number;

  @ApiProperty({ example: CourseEnum.PCX })
  @IsEnum(CourseEnum)
  @IsOptional()
  @Type(() => IsEnum)
  course?: CourseEnum;

  @ApiProperty({ example: CourseFormatEnum.ONLINE })
  @IsEnum(CourseFormatEnum)
  @IsOptional()
  @Type(() => IsEnum)
  course_format?: CourseFormatEnum;

  @ApiProperty({ example: CourseTypeEnum.VIP })
  @IsEnum(CourseTypeEnum)
  @IsOptional()
  @Type(() => IsEnum)
  course_type?: CourseTypeEnum;
}
