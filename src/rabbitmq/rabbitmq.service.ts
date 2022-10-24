import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';

import { PerfectCubicSumDto } from 'src/common/math/math.dto';
import { MathService } from 'src/common/math/math.service';

@Injectable()
export class RabbitmqService {
    constructor(
        private readonly mathService: MathService
    ) { };

    perfectCubicSum(data: PerfectCubicSumDto) {
        return this.mathService.perfectCubicSum(data);
    };
};