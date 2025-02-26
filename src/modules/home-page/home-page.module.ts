import { Module } from '@nestjs/common';

import { HomePageController } from './home-page.controller';
import { HomePageService } from './services/home-page.service';

@Module({
  imports: [],
  controllers: [HomePageController],
  providers: [HomePageService],
  exports: [],
})
export class HomePageModule {}
