//packages
import { NestFactory, } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as hbs from 'hbs';

//modules
import { AppModule } from './app.module';
//dtos
import { RMQConnectionDto } from './services/setup/setup.dto';
import { AppConfigDto } from './basics/dtos/config.dto';
//services
import { SetupJsonService } from './utils/setupJson/setupJson.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const appConfig: AppConfigDto = configService.get('app');
  const { name, port, prefix } = appConfig;

  await registerApplications(app, appConfig);
  await registerMicroServices(app);

  app.setGlobalPrefix(prefix);
  await app.listen(port);
  console.log(`${name} is running on ${port}`);
};

const registerApplications = async (app: NestExpressApplication, config: AppConfigDto) => {
  const staticDir = join(process.cwd(), 'public');
  const viewsDir = join(staticDir, 'views');
  const contentsDir = join(viewsDir, 'contents');
  const partialsDir = join(viewsDir, 'partials');
  const { sessionKey, sessionLife } = config;

  app.use(
    session({
      secret: sessionKey,
      saveUninitialized: false,
      resave: true,
      cookie: { maxAge: +sessionLife }
    })
  );
  app.useStaticAssets(staticDir);
  app.setBaseViewsDir(contentsDir);
  hbs.registerPartials(partialsDir)
  app.setViewEngine('hbs');
};

const registerMicroServices = async (app: NestExpressApplication) => {
  const setupJsonService: SetupJsonService = app.get(SetupJsonService);
  const bossQueueSetup: RMQConnectionDto = await setupJsonService.readByKey('bossQueue');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${bossQueueSetup.account}:${bossQueueSetup.password}@${bossQueueSetup.IP}:${bossQueueSetup.port}`],
      queue: bossQueueSetup.inputQueueName,
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  });
  await app.startAllMicroservices();
};

bootstrap();