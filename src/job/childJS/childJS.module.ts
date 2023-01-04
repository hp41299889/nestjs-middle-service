//packages
import { Module } from '@nestjs/common';

//models
import { JSExecutionLogModelModule } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.module';
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
//services
import { ChildJSService } from './childJS.service';

@Module({
    imports: [
        JSScriptModelModule,
        JSExecutionLogModelModule
    ],
    providers: [ChildJSService],
    exports: [ChildJSService]
})
export class ChildJSModule { };