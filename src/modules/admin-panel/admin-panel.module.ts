import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { AdminPanelController } from './admin-panel.controller';
import { AdminPanelService } from './services/admin_panel.service';

@Module({
  imports: [RepositoryModule, AuthModule, UsersModule],
  controllers: [AdminPanelController],
  providers: [AdminPanelService],
})
export class AdminPanelModule {}
