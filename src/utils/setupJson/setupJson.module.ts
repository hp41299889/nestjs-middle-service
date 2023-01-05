//packages
import { Module } from "@nestjs/common";

//services
import { SetupJsonService } from "./setupJson.service";

@Module({
    providers: [SetupJsonService],
    exports: [SetupJsonService]
})
export class SetupJsonModule { };