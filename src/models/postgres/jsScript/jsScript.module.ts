import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { JSScript } from "./jsScript.entity";
import { JSScriptModelService } from "./jsScript.service";

@Module({
    imports: [TypeOrmModule.forFeature([JSScript])],
    providers: [JSScriptModelService],
    exports: [JSScriptModelService]
})
export class JSScriptModelModule { };