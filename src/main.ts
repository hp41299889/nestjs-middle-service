//packages
import { NestFactory } from '@nestjs/core';

//modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('MiddleService');
  await app.listen(3000);
}
bootstrap();
