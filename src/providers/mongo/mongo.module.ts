//pcakages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//modules
import { SetupJsonModule } from 'src/utils/setupJson/setupJson.module';
//services
import { MongoService } from './mongo.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [SetupJsonModule],
      connectionName: 'MONGO_CONNECTION',
      useClass: MongoService
    }),
  ]
})
export class MongoModule { };