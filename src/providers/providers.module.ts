//packages
import { Module } from "@nestjs/common";

//modules
import { PostgresModule } from "./postgres/postgres.module";
import { MongoModule } from './mongo/mongo.module';

@Module({
    imports: [
        PostgresModule,
        MongoModule
    ]
})
export class ProvidersModule { };