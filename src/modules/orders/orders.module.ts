import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { GroupsModule } from '../groups/groups.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/order.service';

@Module({
  imports: [AuthModule, GroupsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
