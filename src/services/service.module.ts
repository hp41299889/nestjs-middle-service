//packages
import { Module } from "@nestjs/common";

//modules
import { JSScriptModule } from "./jsScript/jsScript.module";
import { SetupModule } from './setup/setup.module';
import { JSExecutionLogModule } from "./jsExecutionLog/jsExecutionLog.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        JSScriptModule,
        SetupModule,
        JSExecutionLogModule,
        AuthModule
    ]
})
export class ServiceModule { };