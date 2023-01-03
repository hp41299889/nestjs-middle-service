import { Module } from "@nestjs/common";

import { JSScriptModule } from "./jsscript/jsscript.module";
import { SetupModule } from './setup/setup.module';

@Module({
    imports: [JSScriptModule, SetupModule]
})
export class ServiceModule { };