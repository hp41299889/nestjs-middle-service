import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { RabbitmqClientModule } from './rabbitmq-client/rabbitmq-client.module';

@Module({
  imports: [
    ApiModule,
    MulterModule.register({
      dest: './upload'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot(),
    RabbitmqClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }