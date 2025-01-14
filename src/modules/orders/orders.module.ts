import { Module } from '@nestjs/common';

import { AdminPanelModule } from '../admin-panel/admin_panel.module';
import { AuthModule } from '../auth/auth.module';
import { GroupsModule } from '../groups/groups.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/order.service';

@Module({
  imports: [AuthModule, GroupsModule, AdminPanelModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
