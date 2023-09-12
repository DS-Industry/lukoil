import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://app.lukoil.ds-mobile.ru',
      'http://localhost:3000',
      'http://app.lukoil.ds-mobile.ru',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to send cookies or credentials
  });

  app.set('trust proxy', 1);

  await app.listen(process.env.PORT, () => {
    logger.log(`LuckOil back-end listening on port ${process.env.PORT}`);
  });
}
bootstrap();
