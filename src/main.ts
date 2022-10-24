import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig, RabbitmqConfig } from './config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get('app');
  const rabbitmqConfig: RabbitmqConfig = configService.get('rabbitmq');
  const { appEnv, appName, appPrefix, appPort } = appConfig;
  const { rabbitmqUsername, rabbitmqPassword, rabbitmqHost, rabbitmqQueueName } = rabbitmqConfig;
  const service = `${appName} is running on ${appPort} for ${appEnv}`;

  app.setGlobalPrefix(appPrefix);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}`],
      queue: rabbitmqQueueName,
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  });
  await app.startAllMicroservices();
  await app.listen(appPort, () => {
    console.log(service);
  });
}
bootstrap();