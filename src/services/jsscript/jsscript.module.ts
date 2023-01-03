import { Module } from '@nestjs/common';

import { JSScriptService } from './jsscript.service';
import { JSScriptController } from './jsscript.controller';
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScript.module';

@Module({
  imports: [JSScriptModelModule,],
  providers: [JSScriptService],
  controllers: [JSScriptController]
})
export class JSScriptModule { };