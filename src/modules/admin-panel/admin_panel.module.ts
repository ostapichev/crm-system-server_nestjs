import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { RepositoryModule } from '../repository/repository.module';
import { AdminPanelController } from './admin_panel.controller';
import { AdminPanelService } from './services/admin_panel.service';
import { SuperUserService } from './services/super-user.service';

@Module({
  imports: [RepositoryModule, AuthModule],
  controllers: [AdminPanelController],
  providers: [AdminPanelService, SuperUserService],
})
export class AdminPanelModule {}
