import { Controller, Post, Body } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

const errorCode = {
    10001: 'a < b'
}

@Controller('rabbitmq')
export class RabbitmqController {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    @MessagePattern('wait-cubicsum')
    async handleWaitCubeSum(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('***wait-cubesum***');
        console.log('payload', data);
        // console.log('context', context);

        channel.ack(originalMessage);
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(data), 3000
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

    @Post('/cubicsum')
    async getCubeSum(@Body() data: any) {
        return this.rabbitmqService.cubicSum(data);
    };
};