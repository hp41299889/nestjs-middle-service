//packages
import { Module } from '@nestjs/common';

//models
import { JSExecutionLogModelModule } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.module';
//controllers
import { JSExecutionLogController } from './jsExecutionLog.controller';
//services
import { JSExecutionLogService } from './jsExecutionLog.service';

@Module({
    imports: [JSExecutionLogModelModule],
    controllers: [JSExecutionLogController],
    providers: [JSExecutionLogService]
})
export class JSExecutionLogModule { };