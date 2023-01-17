//packages
import { Module } from '@nestjs/common';

//modules
import { ProvidersModule } from './providers/providers.module';
import { ServiceModule } from './services/service.module';
import { SwaggerModule } from './basics/swagger/swagger.module';

@Module({
  imports: [
    ProvidersModule,
    ServiceModule,
    SwaggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { };