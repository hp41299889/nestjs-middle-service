import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  appConfig,
  rabbitmqConfig
} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        rabbitmqConfig
      ]
    })
  ],
  providers: [
    ConfigService
  ]
})
export class AppConfigModule { }
