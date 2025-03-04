import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { BaseCommentReqDto } from './dto/req/base-comment.req.dto';
import { CreateUpdateOrderReqDto } from './dto/req/create-update-order-req.dto';
import { OrderListQueryDto } from './dto/req/order-list-query.dto';
import { BaseCommentResDto } from './dto/res/base-comment.res.dto';
import { CreateUpdateOrderResDto } from './dto/res/create-update-order-res.dto';
import { OrderListResDto } from './dto/res/order-list.res.dto';
import { OrderListItemResDto } from './dto/res/order-list-item.res.dto';
import { NumberGuard } from './guards/number.guard';
import { OwnerGuard } from './guards/owner.guard';
import { CommentMapper } from './mappers/comment.mapper';
import { OrderMapper } from './mappers/order.mapper';
import { ExportFileService } from './services/export-file.service';
import { OrdersService } from './services/order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly exportFileService: ExportFileService,
  ) {}

  @ApiOperation({ description: 'Create new order' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  public async createNewOrder(
    @Body() dto: CreateUpdateOrderReqDto,
  ): Promise<CreateUpdateOrderResDto> {
    const result = await this.ordersService.createOrder(dto);
    return OrderMapper.toResponseCreateUpdateItemDTO(result);
  }

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

  @ApiOperation({ description: 'Create exel file for orders' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('download')
  async downloadExcel(@Query() query: OrderListQueryDto, @Res() res: Response) {
    const [entities] = await this.ordersService.getListAllOrders(query);
    const filename: string = this.exportFileService.getCurrentDate();
    const buffer: Buffer<ArrayBufferLike> =
      await this.exportFileService.generateExcel(entities);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
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
  @UseGuards(OwnerGuard)
  @Patch(':orderId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('orderId') orderId: number,
    @Body() dto: CreateUpdateOrderReqDto,
  ): Promise<CreateUpdateOrderResDto> {
    const result = await this.ordersService.updateOrder(orderId, dto, userData);
    return OrderMapper.toResponseCreateUpdateItemDTO(result);
  }

  @ApiOperation({ description: 'Get list all orders' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('comments/:orderId')
  public async getListCommentsByOrder(
    @Param('orderId') orderId: number,
  ): Promise<BaseCommentResDto[]> {
    const entities = await this.ordersService.getListCommentsByOrderId(orderId);
    return CommentMapper.toResponseListDTO(entities);
  }

  @ApiOperation({ description: 'Create comment for order' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @Post('comments/:orderId')
  public async addComment(
    @CurrentUser() userData: IUserData,
    @Param('orderId') orderId: number,
    @Body() dto: BaseCommentReqDto,
  ): Promise<BaseCommentResDto> {
    return await this.ordersService.createComment(dto, orderId, userData);
  }
}
