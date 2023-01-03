import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Controller()
export class RabbitmqController {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    @MessagePattern('perfectCubicSum')
    async handlePerfectCubicSum(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('***MessagePattern got perfectCubicSum***');
        console.log('***payload***', data);

        channel.ack(originalMessage);
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(this.rabbitmqService.perfectCubicSum(data)), 3000
            ))
    };

    @MessagePattern('childProcess')
    async handleChildProcess(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('***MessagePattern got childProcess***');
        console.log('***payload***', data);

        channel.ack(originalMessage);
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(this.rabbitmqService.childProcess(data)), 3000
            ))
    };

    @MessagePattern('error')
    handleError(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('***error***');
        console.log('payload', data);
        // console.log('context', context);
        const errorMessage = `Error, code:${data}`

        channel.ack(originalMessage);
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(errorMessage), 3000
            ));
    };
};