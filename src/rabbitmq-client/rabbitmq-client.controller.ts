import { Controller, Post, Body } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { RabbitmqClientService } from './rabbitmq-client.service';
import { RabbitmqClientMessageDto } from './rabbitmq-client.dto';

@Controller('rabbitmq-client')
export class RabbitmqClientController {
    constructor(
        private readonly rabbitmqClientService: RabbitmqClientService
    ) { };

    @EventPattern('post-message')
    handlePostMessageEvent(@Payload() data: RabbitmqClientMessageDto, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('********post********');
        console.log('payload', data);
        console.log('context', context);

        channel.ack(originalMessage);
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(data), 3000
            ));
    };

    @EventPattern('error')
    handleError(@Payload() data: RabbitmqClientMessageDto, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        console.log('********error********');
        console.log('payload', data);
        console.log('context', context);

        channel.ack(originalMessage);
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(data), 3000
            ));
    };

    @Post('/message')
    postMessage(@Body() data: RabbitmqClientMessageDto): Observable<string> {
        const random = (Math.random() * (10 - 0) + 0).toFixed(2);
        data.number = Number(random);

        return this.rabbitmqClientService.handleCondition(data);
    };
};