//packages
import { Module } from '@nestjs/common';

//models
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
//modules
import { HttpResponseModule } from 'src/utils/httpResponse/httpResponse.module';
import { ChildJSModule } from 'src/job/childJS/childJS.module';
import { CommonModule } from 'src/utils/common/common.module';
//controllers
import { JSScriptController } from './jsScript.controller';
//services
import { JSScriptService } from './jsScript.service';

@Module({
  imports: [
    HttpResponseModule,
    JSScriptModelModule,
    ChildJSModule,
    CommonModule
  ],
  providers: [JSScriptService],
  controllers: [JSScriptController]
})
export class JSScriptModule { };