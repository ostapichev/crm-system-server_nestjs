import { ApiProperty } from '@nestjs/swagger';

export class OrdersStatisticDto {
  @ApiProperty({
    example: 500,
    description: 'Orders count',
  })
  orders: number;

  @ApiProperty({
    example: 52,
    description: 'Count agree',
  })
  agree: number;

  @ApiProperty({
    example: 102,
    description: 'Count in work',
  })
  in_work: number;

  @ApiProperty({
    example: 22,
    description: 'Count disagree',
  })
  disagree: number;

  @ApiProperty({
    example: 11,
    description: 'Count dubbing',
  })
  dubbing: number;

  @ApiProperty({
    example: 120,
    description: 'Count new',
  })
  news: number;

  @ApiProperty({
    example: 12,
    description: 'Count null',
  })
  status_null: number;
}
