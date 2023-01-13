//packages
import { Module } from '@nestjs/common';

//models
import { JSExecutionLogModelModule } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.module';
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
//modules
import { ChildModule } from '../child/child.module';
import { CommonModule } from 'src/utils/common/common.module';
//services
import { ChildJSService } from './childJS.service';

@Module({
    imports: [
        ChildModule,
        JSScriptModelModule,
        JSExecutionLogModelModule,
        CommonModule
    ],
    providers: [ChildJSService],
    exports: [ChildJSService]
})
export class ChildJSModule { };