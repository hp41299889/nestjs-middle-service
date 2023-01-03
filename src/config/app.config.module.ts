import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    appConfig,
    mongoConfig,
    postgreConfig,
    rabbitmqConfig
} from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [
                appConfig,
                mongoConfig,
                postgreConfig,
                rabbitmqConfig
            ]
        })
    ],
    providers: [
        ConfigService
    ],
    exports: [
        ConfigService
    ]
})
export class AppConfigModule { }
