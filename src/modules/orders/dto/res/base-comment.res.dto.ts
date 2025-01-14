import { ApiProperty } from '@nestjs/swagger';

export class BaseCommentResDto {
  @ApiProperty({
    example: 1,
    description: 'Comment id',
  })
  id: number;

  @ApiProperty({
    example: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    description: 'Text of comment',
  })
  text: string;

  @ApiProperty({
    example: 1,
    description: 'Order id',
  })
  order_id: number;

  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  manager_id: number;

  @ApiProperty({
    example: '2024-01-19 11:34:10.000000',
    description: 'created at',
  })
  created_at: Date;
}
