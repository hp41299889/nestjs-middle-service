//packages
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './basics/configs/app.config';

//modules
import { ProvidersModule } from './providers/providers.module';
import { ServiceModule } from './services/service.module';

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