import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { GlobalExceptionFilter } from '../common';
import configuration from '../config/configuration';
import { AdminPanelModule } from './admin-panel/admin_panel.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { LoggerModule } from './logger/logger.module';
import { MysqlModule } from './mysql/mysql.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AdminPanelModule,
    AuthModule,
    OrdersModule,
    MysqlModule,
    UsersModule,
    LoggerModule,
    RepositoryModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}