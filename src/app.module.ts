import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqClientModule } from './rabbitmq-client/rabbitmq-client.module';
import { AppConfigModule } from './config/app.config.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    RabbitmqClientModule,
    AppConfigModule,
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }