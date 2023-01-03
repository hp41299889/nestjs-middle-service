import { Module } from '@nestjs/common';

<<<<<<< HEAD
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
export class AppModule { }
=======
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
>>>>>>> a5e8bdad0b7a8e0d147c1e09196ceef44cd51138
