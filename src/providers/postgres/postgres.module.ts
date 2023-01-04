//packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//models
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
//services
import { PostgresService } from './postgres.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useClass: PostgresService }),
        JSScriptModelModule
    ]
})
export class PostgresModule { }
