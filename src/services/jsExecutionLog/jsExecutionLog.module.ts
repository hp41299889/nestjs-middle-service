//packages
import { Module } from '@nestjs/common';

//models
import { JSExecutionLogModelModule } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.module';
//modules
import { TimeHelperModule } from 'src/utils/timeHelper/timeHelper.module';
//controllers
import { JSExecutionLogController } from './jsExecutionLog.controller';
//services
import { JSExecutionLogService } from './jsExecutionLog.service';

@Module({
    imports: [JSExecutionLogModelModule, TimeHelperModule],
    controllers: [JSExecutionLogController],
    providers: [JSExecutionLogService]
})
export class JSExecutionLogModule { };