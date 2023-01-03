import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { ChildProcessService } from 'src/common/childProcess/child-process.service';

import { PerfectCubicSumDto } from 'src/common/math/math.dto';
import { ChildProcessDto } from 'src/common/childProcess/child-process.dto';
import { MathService } from 'src/common/math/math.service';

@Injectable()
export class RabbitmqService {
    constructor(
        private readonly mathService: MathService,
        private readonly childProcessService: ChildProcessService
    ) { };

    perfectCubicSum(data: PerfectCubicSumDto) {
        return this.mathService.perfectCubicSum(data);
    };

    childProcess(data: ChildProcessDto) {
        return this.childProcessService.childProcess(data);
    };
};