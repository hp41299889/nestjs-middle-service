//packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//models
import { JSExecutionLogModelService } from './jsExecutionLogModel.service';
import { JSExecutionLog, JSExecutionLogSchema } from './jsExecutionLogModel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: JSExecutionLog.name,
      schema: JSExecutionLogSchema
    }], 'MONGO_CONNECTION')
  ],
  providers: [JSExecutionLogModelService],
  exports: [JSExecutionLogModelService]
})
export class JSExecutionLogModelModule { };