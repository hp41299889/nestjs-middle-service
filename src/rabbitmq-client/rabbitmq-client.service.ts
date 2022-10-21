import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';

import { RabbitmqClientMessageDto } from './rabbitmq-client.dto';

@Injectable()
export class RabbitmqClientService {
    constructor(
        @Inject('LNT_MiddleService') private readonly client: ClientProxy
    ) {
        this.client.connect();
    };

    handleCondition(data: RabbitmqClientMessageDto) {
        const { name, message, number } = data;
        if (number < 5) return this.postMessage(data);
        else return this.handleError(data);
    };

    postMessage(data: RabbitmqClientMessageDto): Observable<string> {
        const { name, message, number } = data;
        const rabbitmqResponse = `Hi ${name}, I'm RabbitMQ, you said ${message}\nnumber: ${number}`;
        return this.client
            .send('post-message', rabbitmqResponse)
            .pipe(timeout(5000));
    };

    handleError(data: RabbitmqClientMessageDto) {
        const { name, message, number } = data;
        const errorResponse = `Hi ${name}, I'm RabbitMQ, you got error because\nyour number is ${number}`;
        return this.client
            .send('error', errorResponse)
            .pipe(timeout(5000));
    };
};