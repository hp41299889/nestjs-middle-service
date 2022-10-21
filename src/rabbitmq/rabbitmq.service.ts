import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('LNT_MiddleService') private readonly client: ClientProxy
    ) { };

    cubicSum(data: any) {
        const { a, b }: any = data;
        if (a < b) {
            return this.client
                .send('error', 10001)
                .pipe(timeout(5000))
        } else {
            const ans = (a - b) * (Math.pow(a, 2) - a * b + Math.pow(b, 2));
            return this.client
                .send('wait-cubicsum', ans)
                .pipe(timeout(5000))
        }
    };
};