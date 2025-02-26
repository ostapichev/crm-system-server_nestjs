import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { HomePageService } from './services/home-page.service';

@ApiTags('Home page')
@Controller('home')
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @SkipAuth()
  @Get()
  public getHomePage(@Res() res: Response): void {
    this.homePageService.getHomePage(res);
  }
}
