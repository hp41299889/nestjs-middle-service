//packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//models
import { JSScriptModelModule } from 'src/models/postgres/jsScript/jsScriptModel.module';
import { SetupJsonModule } from 'src/utils/setupJson/setupJson.module';
//services
import { PostgresService } from './postgres.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [SetupJsonModule],
            useClass: PostgresService
        }),
        JSScriptModelModule
    ]
})
export class PostgresModule { }
