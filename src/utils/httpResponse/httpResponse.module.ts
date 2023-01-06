//packages
import { Module } from "@nestjs/common";

//services
import { HttpResponseService } from "./httpResponse.service";

@Module({
    providers: [HttpResponseService],
    exports: [HttpResponseService]
})
export class HttpResponseModule { };