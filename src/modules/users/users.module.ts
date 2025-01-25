import { forwardRef, Module } from '@nestjs/common';

import { OrdersModule } from '../orders/orders.module';
import { SuperUserService } from './services/super-user.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  controllers: [UsersController],
  providers: [UsersService, SuperUserService],
  exports: [UsersService],
})
export class UsersModule {}
