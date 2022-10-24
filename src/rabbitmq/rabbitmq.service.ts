import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';

import { PerfectCubicSumDto } from 'src/common/math/math.dto';
import { MathService } from 'src/common/math/math.service';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('RabbitmqService') private readonly client: ClientProxy,
        private readonly mathService: MathService
    ) { };

    sendPerfectCubicSum(data: PerfectCubicSumDto) {
        const ans = this.mathService.perfectCubicSum(data);
        return this.client
            .send('perfectcubicSum', ans)
            .pipe(timeout(5000));
    };
};