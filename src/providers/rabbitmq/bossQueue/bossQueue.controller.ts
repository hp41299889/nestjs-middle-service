//packages
import { Controller, Logger } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { RMQMessageDto } from "./bossQueue.dto";
import { BossQueueService } from "./bossQueue.service";

@Controller()
export class BossQueueController {
    constructor(
        private readonly bossQueueService: BossQueueService
    ) { };

    private readonly logger = new Logger(BossQueueController.name);

    @MessagePattern()
    async consumeMessage(@Payload() data: RMQMessageDto, @Ctx() ctx: RmqContext) {
        try {
            this.logger.debug('consumeMessage');
            const channel = ctx.getChannelRef();
            const originMessage = ctx.getMessage();
            channel.ack(originMessage);
            await this.bossQueueService.handleMessage(data);
        } catch (err) {
            this.logger.error('consumeMessage fail');
            throw err;
        };
    };
};