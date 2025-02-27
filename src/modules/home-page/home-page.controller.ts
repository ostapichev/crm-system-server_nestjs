import { Controller, Get, Render } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';

@ApiTags('Home page')
@Controller('home')
export class HomePageController {
  @ApiOperation({ description: 'Get information about crm system API' })
  @SkipAuth()
  @Render('index')
  @Get()
  public getHomePage() {
    return { message: 'Welcome to crm system API' };
  }
}
