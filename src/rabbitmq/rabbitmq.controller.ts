import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class RabbitmqController {

    @MessagePattern('perfectcubicSum')
    async handleWaitCubeSum(@Payload() data: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('***perfectcubicSum***');
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
};