import { Module } from '@nestjs/common';

import { ProvidersModule } from './providers/providers.module';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [
    ProvidersModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { };