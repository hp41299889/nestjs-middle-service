//packages
import { Module } from "@nestjs/common";
import { JSExecutionLogModule } from "./jsExecutionLog/jsExecutionLog.module";

//modules
import { JSScriptModule } from "./jsScript/jsScript.module";
import { SetupModule } from './setup/setup.module';

@Module({
    imports: [
        JSScriptModule,
        SetupModule,
        JSExecutionLogModule
    ]
})
export class ServiceModule { };