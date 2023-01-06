//packages
import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

//modules
import { SetupJsonModule } from "src/utils/setupJson/setupJson.module";
//dtos
import { RMQConnectionDto } from "src/services/setup/setup.dto";
//controllers
import { BossQueueController } from "./bossQueue.controller";
//services
import { SetupJsonService } from "src/utils/setupJson/setupJson.service";
import { BossQueueService } from "./bossQueue.service";
import { ChildJSModule } from "src/job/childJS/childJS.module";

@Module({
    imports: [SetupJsonModule, ChildJSModule],
    providers: [
        BossQueueService,
        {
            provide: 'BOSSQUEUE_CONNECTION',
            inject: [SetupJsonService],
            useFactory: async (setupJsonService: SetupJsonService) => {
                const setupJson: RMQConnectionDto = await setupJsonService.readByKey('bossQueue');
                const { account, password, IP, port, inputQueueName, outputQueueName } = setupJson;
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${account}:${password}@${IP}:${port}`],
                        queue: outputQueueName,
                        serializer: {
                            serialize: value => value.data,
                        },
                        noAck: false,
                        queueOptions: {
                            durable: true
                        }
                    }
                })
            }
        }
    ],
    controllers: [BossQueueController],
    exports: [BossQueueService]
})
export class BossQueueModule { };