import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { GroupsModule } from '../groups/groups.module';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './orders.controller';
import { ExportFileService } from './services/export-file.service';
import { OrdersService } from './services/order.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    GroupsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ExportFileService],
  exports: [OrdersService],
})
export class OrdersModule {}
