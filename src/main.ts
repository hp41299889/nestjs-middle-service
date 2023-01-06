//packages
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as session from 'express-session';

//modules
import { AppModule } from './app.module';
//dtos
import { RMQConnectionDto } from './services/setup/setup.dto';
//services
import { SetupJsonService } from './utils/setupJson/setupJson.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const setupJsonService: SetupJsonService = app.get(SetupJsonService);
  const bossQueueSetup: RMQConnectionDto = await setupJsonService.readByKey('bossQueue');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${bossQueueSetup.account}:${bossQueueSetup.password}@${bossQueueSetup.IP}:${bossQueueSetup.port}`],
      queue: bossQueueSetup.inputQueueName,
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  });
  app.use(
    session({
      secret: 'lnt',
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: 1000 * 60 * 30 }
    })
  );
  await app.startAllMicroservices();
  app.setGlobalPrefix('MiddleService');
  await app.listen(3000);
}
bootstrap();
