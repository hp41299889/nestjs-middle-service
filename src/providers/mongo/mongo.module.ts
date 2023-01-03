import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoService } from './mongo.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: 'MONGO_CONNECTION',
      useClass: MongoService
    })
  ]
})
export class MongoModule { };