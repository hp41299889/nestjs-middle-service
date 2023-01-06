//packages
import { Module } from "@nestjs/common";

//modules
import { PostgresModule } from "./postgres/postgres.module";
import { MongoModule } from './mongo/mongo.module';
import { RabbitmqModule } from "./rabbitmq/rabbitmq.module";

@Module({
    imports: [
        PostgresModule,
        MongoModule,
        RabbitmqModule
    ]
})
export class ProvidersModule { };