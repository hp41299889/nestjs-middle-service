//packages
import { Module } from "@nestjs/common";

//modules
import { JSScriptModule } from "./jsScript/jsScript.module";
import { SetupModule } from './setup/setup.module';

@Module({
    imports: [JSScriptModule, SetupModule]
})
export class ServiceModule { };