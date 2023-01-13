//packages
import { Module } from "@nestjs/common";

//services
import { CommonService } from "./common.service";

@Module({
    providers: [CommonService],
    exports: [CommonService]
})
export class CommonModule { };