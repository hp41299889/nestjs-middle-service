import { Module } from '@nestjs/common';

import { JSScriptService } from './jsscript.service';
import { JSScriptController } from './jsscript.controller';
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
import { ChildJSModule } from 'src/job/childJS/childJS.module';

@Module({
  imports: [JSScriptModelModule, ChildJSModule],
  providers: [JSScriptService],
  controllers: [JSScriptController]
})
export class JSScriptModule { };