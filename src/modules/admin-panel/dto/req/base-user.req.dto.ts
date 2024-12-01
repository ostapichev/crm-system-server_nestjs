import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common';

export class BaseUserReqDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @Length(2, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @Length(2, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  surname: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  @Length(3, 100)
  @Transform(TransformHelper.trim)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @Type(() => IsEmail)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(8, 20)
  @Transform(TransformHelper.trim)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  @Type(() => String)
  password: string;
}
