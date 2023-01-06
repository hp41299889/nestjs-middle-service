//packages
import { Module } from "@nestjs/common";
import { BossQueueModule } from "./bossQueue/bossQueue.module";

@Module({
    imports: [BossQueueModule],
    exports: [BossQueueModule]
})
export class RabbitmqModule { };