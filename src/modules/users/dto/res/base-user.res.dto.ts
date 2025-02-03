import { ApiProperty } from '@nestjs/swagger';

import { UserRoleEnum } from '../../../../database/enums';

export class BaseUserResDto {
  @ApiProperty({ description: 'User id' })
  id: number;

  @ApiProperty({
    example: 'User name',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    example: '380983456789',
    description: 'User surname',
  })
  surname: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Email user',
  })
  email: string;

  @ApiProperty({
    example: 'buyer',
    description: 'role user',
  })
  role: UserRoleEnum;

  @ApiProperty({
    example: 'true',
  })
  is_active: boolean;

  @ApiProperty({
    description: 'order id',
  })
  orders?: string[];

  @ApiProperty({
    example: '2024-09-17T19:39:48.603Z',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-09-17T19:39:48.603Z',
  })
  last_login?: Date;
}
