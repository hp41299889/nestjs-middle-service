//packages
import { Module } from '@nestjs/common';

//modules
import { ProvidersModule } from './providers/providers.module';
import { ServiceModule } from './services/service.module';

//TODO config problem
@Module({
  imports: [
    ProvidersModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { };