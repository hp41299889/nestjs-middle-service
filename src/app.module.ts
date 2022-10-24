import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app.config.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { MathModule } from './common/math/math.module';

@Module({
  imports: [
    AppConfigModule,
    RabbitmqModule,
    MathModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }