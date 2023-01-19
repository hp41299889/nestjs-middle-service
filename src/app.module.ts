//packages
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

//modules
import { ProvidersModule } from './providers/providers.module';
import { ServiceModule } from './services/service.module';
import { SwaggerModule } from './basics/swagger/swagger.module';

import { JSScriptController } from './services/jsScript/jsScript.controller';
import { JSExecutionLogController } from './services/jsExecutionLog/jsExecutionLog.controller';
import { SetupController } from './services/setup/setup.controller';

import { sessionCheck } from './utils/session/session.middleware';

@Module({
  imports: [
    ProvidersModule,
    ServiceModule,
    SwaggerModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(sessionCheck)
      .exclude(
        'Auth/(.*)'
      )
      .forRoutes(
        JSScriptController,
        JSExecutionLogController,
        SetupController
      );
  }
};