//packages
import { Module } from "@nestjs/common";

//services
import { TimeHelperService } from "./timeHelper.service";

@Module({
    providers: [TimeHelperService],
    exports: [TimeHelperService]
})
export class TimeHelperModule { };