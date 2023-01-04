import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
import { PostgresService } from './postgres.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useClass: PostgresService }),
        JSScriptModelModule
    ]
})
export class PostgresModule { }
