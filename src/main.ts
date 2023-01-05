//packages
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';

//modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'lnt',
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: 1000 * 60 * 30 }
    })
  );
  app.setGlobalPrefix('MiddleService');
  await app.listen(3000);
}
bootstrap();
