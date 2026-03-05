import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { appConfig } from './config/app-config';
// import { MongoExceptionFilter } from './filters/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(appConfig.port);
}
void bootstrap();
