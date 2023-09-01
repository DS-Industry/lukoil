import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('app');
  app.useGlobalFilters(new AllExceptionFilter());

  app.enableCors({
    origin: 'http://app.lukoil.ds-mobile.ru',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to send cookies or credentials
  });

  await app.listen(process.env.PORT, () => {
    logger.log(`LuckOil back-end listening on port ${process.env.PORT}`);
  });
}
bootstrap();
