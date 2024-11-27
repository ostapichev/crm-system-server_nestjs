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
import { Entity } from 'typeorm';

import { TransformHelper } from '../../../../common';
import { GroupEntity } from '../../../../database/entities';
import {
  CourseEnum,
  FormatEnum,
  StatusEnum,
  TypeEnum,
} from '../../../../database/enums';

export class BaseOrderReqDto {
  @ApiProperty({ example: 1 })
  @Type(() => Entity)
  group?: GroupEntity;

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

  @ApiProperty({ example: FormatEnum.ONLINE })
  @IsEnum(FormatEnum)
  @Type(() => IsEnum)
  format?: FormatEnum;

  @ApiProperty({ example: TypeEnum.VIP })
  @IsEnum(TypeEnum)
  @Type(() => IsEnum)
  type?: TypeEnum;
}
