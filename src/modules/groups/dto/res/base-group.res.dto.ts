import { ApiProperty } from '@nestjs/swagger';

export class BaseGroupResDto {
  @ApiProperty({
    example: 1,
    description: 'Group id',
  })
  id: number;

  @ApiProperty({
    example: 'dec-2022',
    description: 'Group name',
  })
  name: string;
}
