import { Module } from '@nestjs/common';

import { HomePageController } from './home-page.controller';

@Module({
  controllers: [HomePageController],
})
export class HomePageModule {}
