import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqConfig } from '../config/config.interface';
import { AppConfigModule } from 'src/config/app.config.module';
import { RabbitmqController } from './rabbitmq.controller';
import { MathModule } from 'src/common/math/math.module';

@Module({
  imports: [
    AppConfigModule,
    MathModule
  ],
  controllers: [RabbitmqController],
  providers: [
    {
      provide: 'RabbitmqService',
      useFactory: (configService: ConfigService) => {
        const rabbitmqConfig: RabbitmqConfig = configService.get('rabbitmq');
        const { rabbitmqUsername, rabbitmqPassword, rabbitmqHost, rabbitmqQueueName } = rabbitmqConfig;

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}`],
            queue: rabbitmqQueueName,
            queueOptions: {
              durable: true
            }
          }
        })
      },
      inject: [ConfigService]
    },
    RabbitmqService,
  ],
  exports: [
    RabbitmqService
  ]
})
export class RabbitmqModule { }
