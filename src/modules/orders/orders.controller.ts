import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { OrderListQueryDto } from './dto/req/order-list-query.dto';
import { UpdateOrderReqDto } from './dto/req/update-order.req.dto';
import { OrderListResDto } from './dto/res/order-list.res.dto';
import { OrderListItemResDto } from './dto/res/order-list-item.res.dto';
import { OrderUpdateResDto } from './dto/res/order-update-res.dto';
import { AuthorGuard } from './guards/author.guard';
import { NumberGuard } from './guards/number.guard';
import { OrderMapper } from './mappers/order.mapper';
import { OrdersService } from './services/order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ description: 'Get list all orders' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  public async getListAllOrders(
    @Query() query: OrderListQueryDto,
  ): Promise<OrderListResDto> {
    const [entities, total] = await this.ordersService.getListAllOrders(query);
    return OrderMapper.toResponseListDTO(entities, total, query);
  }

  @ApiOperation({ description: 'Get order by id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(NumberGuard)
  @Get(':orderId')
  public async findOneOrder(
    @Param('orderId') orderId: number,
  ): Promise<OrderListItemResDto> {
    const result = await this.ordersService.findOneOrder(orderId);
    return OrderMapper.toResponseListItemDTO(result);
  }

  @ApiOperation({ description: 'Update order by id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AuthorGuard)
  @Patch(':orderId')
  public async update(
    @Param('orderId') orderId: number,
    @Body() dto: UpdateOrderReqDto,
  ): Promise<OrderUpdateResDto> {
    const result = await this.ordersService.updateOrder(orderId, dto);
    return OrderMapper.toResponseUpdateDTO(result);
  }
}
