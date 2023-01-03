import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JSExecutionLogService } from './jsExecutionLog.service';
import { JSExecutionLog, JSExecutionLogSchema } from './jsExecutionLog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: JSExecutionLog.name, schema: JSExecutionLogSchema }])],
  providers: [JSExecutionLogService]
})
export class JSExecutionLogModule { };