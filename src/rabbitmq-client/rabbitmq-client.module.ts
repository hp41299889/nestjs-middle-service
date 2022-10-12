import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqClientController } from './rabbitmq-client.controller';
import { RabbitmqClientService } from './rabbitmq-client.service';

@Module({
  imports: [ConfigModule],
  controllers: [RabbitmqClientController],
  providers: [
    {
      provide: 'danny_service',
      useFactory: (configService: ConfigService) => {
        const username = configService.get('RABBITMQ_USERNAME');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${username}:${password}@${host}`],
            queue: queueName,
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
