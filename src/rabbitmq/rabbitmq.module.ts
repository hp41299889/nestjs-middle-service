import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqConfig } from '../config/interface';
import { RabbitmqController } from './rabbitmq.controller';

@Module({
  imports: [ConfigModule],
  controllers: [RabbitmqController],
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
    RabbitmqService
  ],
})
export class RabbitmqModule { }
