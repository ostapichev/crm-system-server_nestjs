import { Global, Module } from '@nestjs/common';

import { CommentRepository } from './services/comment.repository';
import { GroupRepository } from './services/group.repository';
import { OrderRepository } from './services/order.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  OrderRepository,
  GroupRepository,
  CommentRepository,
];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
