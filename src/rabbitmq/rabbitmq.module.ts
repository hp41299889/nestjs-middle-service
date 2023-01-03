import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { RabbitmqService } from './rabbitmq.service';
import { AppConfigModule } from 'src/config/app.config.module';
import { RabbitmqController } from './rabbitmq.controller';
import { MathModule } from 'src/common/math/math.module';
import { ChildProcessModule } from 'src/common/childProcess/child-process.module';

@Module({
  imports: [
    AppConfigModule,
    MathModule,
    ChildProcessModule
  ],
  controllers: [RabbitmqController],
  providers: [
    RabbitmqService,
  ],
  exports: [
    RabbitmqService
  ]
})
export class RabbitmqModule { }