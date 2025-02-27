import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

import { AppConfig } from './config';
import { AppModule } from './modules/app.module';
import { SuperUserService } from './modules/users/services/super-user.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  const config = new DocumentBuilder()
    .setTitle('CRM system: orders')
    .setDescription(
      `CRM system for IT school. ` +
        `Base URL: 'http://${appConfig.host}:${appConfig.port}/api'`,
    )
    .setVersion('1.1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 2,
      persistAuthorization: true,
    },
  });
  document.servers = [{ url: '/api' }];
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'static'));
  app.setViewEngine('hbs');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(appConfig.port, async () => {
    const superuser = app.get<SuperUserService>(SuperUserService);
    await superuser.createSuperUser();
    Logger.log(
      `Server running on http://${appConfig.host}:${appConfig.port}/api/home`,
    );
    Logger.log(
      `Swagger running on http://${appConfig.host}:${appConfig.port}/api/docs`,
    );
  });
}
void bootstrap();
