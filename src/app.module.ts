//packages
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//configs
import appConfig from './basics/configs/app.config';
import { authConfig, jsExecutionConfig, setupConfig } from './services/service.config';
//modules
import { ProvidersModule } from './providers/providers.module';
import { ServiceModule } from './services/service.module';

//TODO config problem
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    ProvidersModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { };