//packages
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

//modules
import { AppModule } from './app.module';
//dtos
import { RMQConnectionDto } from './services/setup/setup.dto';
import { AppConfigDto } from './basics/dtos/config.dto';
//services
import { SetupJsonService } from './utils/setupJson/setupJson.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const setupJsonService: SetupJsonService = app.get(SetupJsonService);
  const appConfig: AppConfigDto = configService.get('app');
  const bossQueueSetup: RMQConnectionDto = await setupJsonService.readByKey('bossQueue');
  const { name, port, prefix, sessionKey, sessionLife } = appConfig;
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
      secret: sessionKey,
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: +sessionLife }
    })
  );
  await app.startAllMicroservices();
  app.setGlobalPrefix(prefix);
  await app.listen(port);
  console.log(`${name} is running on ${port}`);
};
bootstrap();