import { ApiProperty } from '@nestjs/swagger';

import {
  CourseEnum,
  FormatEnum,
  StatusEnum,
  TypeEnum,
} from '../../../../database/enums';

export class BaseOrderResDto {
  @ApiProperty({
    example: 344,
    description: 'Order id',
  })
  id: number;

  @ApiProperty({
    example: 'dec-2022',
    description: 'group',
  })
  group: string;

  @ApiProperty({
    example: 'John',
    description: 'name',
  })
  name: string;

  @ApiProperty({
    example: 'Smith',
    description: 'surname',
  })
  surname: string;

  @ApiProperty({
    example: 'smith@mail.net',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: '380981234567',
    description: 'phone',
  })
  phone: string;

  @ApiProperty({
    example: 20,
    description: 'age',
  })
  age: number;

  @ApiProperty({
    example: StatusEnum.IN_WORK,
    description: 'status',
  })
  status: string;

  @ApiProperty({
    example: 50000,
    description: 'sum',
  })
  sum: number;

  @ApiProperty({
    example: 10000,
    description: 'already paid',
  })
  alreadyPaid: number;

  @ApiProperty({
    example: CourseEnum.JSCX,
    description: 'Course',
  })
  course: string;

  @ApiProperty({
    example: FormatEnum.ONLINE,
    description: 'course format',
  })
  course_format: string;

  @ApiProperty({
    example: TypeEnum.VIP,
    description: 'course type',
  })
  type: string;

  @ApiProperty({
    example: new Date(),
    description: 'created',
  })
  created_at: Date;

  @ApiProperty({
    example: 'Jack',
    description: 'manager name',
  })
  manager: string;
}
