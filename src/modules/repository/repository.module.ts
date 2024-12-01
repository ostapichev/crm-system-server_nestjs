import { Global, Module } from '@nestjs/common';

import { GroupRepository } from './services/group.repository';
import { OrderRepository } from './services/order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  OrderRepository,
  GroupRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
