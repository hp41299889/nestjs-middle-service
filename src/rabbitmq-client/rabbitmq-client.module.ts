import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { AppConfigModule } from 'src/config/app.config.module';
import { RabbitmqClientController } from './rabbitmq-client.controller';
import { RabbitmqClientService } from './rabbitmq-client.service';
import { RabbitmqConfig } from '../config/interface';

@Module({
  imports: [ConfigModule],
  controllers: [RabbitmqClientController],
  providers: [
    {
      provide: 'LNT_MiddleService',
      useFactory: (configService: ConfigService) => {
        const rabbitmqConfig: RabbitmqConfig = configService.get('rabbitmq');
        const { rmqUsername, rmqPassword, rmqHost, rmqQueueName } = rabbitmqConfig;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${rmqUsername}:${rmqPassword}@${rmqHost}`],
            queue: rmqQueueName,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    },
    RabbitmqClientService
  ]
})
export class RabbitmqClientModule { }
