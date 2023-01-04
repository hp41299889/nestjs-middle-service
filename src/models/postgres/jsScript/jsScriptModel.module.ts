//packages
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

//models
import { JSScript } from "./jsScriptModel.entity";
import { JSScriptModelService } from "./jsScriptModel.service";

@Module({
    imports: [TypeOrmModule.forFeature([JSScript])],
    providers: [JSScriptModelService],
    exports: [JSScriptModelService]
})
export class JSScriptModelModule { };