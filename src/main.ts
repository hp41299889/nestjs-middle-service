//packages
import { NestFactory, } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as hbs from 'hbs';

//configs
import { appConfig } from './basics/configs/config';
//modules
import { AppModule } from './app.module';
//dtos
import { RMQConnectionDto } from './services/setup/setup.dto';
//services
import { SetupJsonService } from './utils/setupJson/setupJson.service';
import { SwaggerService } from './basics/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { name, prefix, port } = appConfig;
  app.setGlobalPrefix(prefix);
  await registerApplications(app);
  await registerMicroServices(app);

  await app.listen(port);
  console.log(`${name} is running on ${port}`);
};

const registerApplications = async (app: NestExpressApplication) => {
  const swagger = app.get(SwaggerService);
  const staticDir = join(process.cwd(), 'public');
  const viewsDir = join(staticDir, 'views');
  const contentsDir = join(viewsDir, 'contents');
  const partialsDir = join(viewsDir, 'partials');
  const { sessionKey, sessionLife } = appConfig;

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
  swagger.setupSwagger(app);
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