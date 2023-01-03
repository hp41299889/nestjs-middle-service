import { Injectable } from '@nestjs/common';

import { PerfectCubicSumDto } from './math.dto';

@Injectable()
export class MathService {
    constructor(
    ) { };

    pow(num: number, pow: number) {
        return Math.pow(num, pow);
    };

    perfectCubicSum(data: PerfectCubicSumDto) {
        const { a, b, name, message } = data;
        const a2 = this.pow(a, 2);
        const b2 = this.pow(b, 2);
        const a3 = this.pow(a, 3);
        const b3 = this.pow(b, 3);

        const res = {
            ans: a3 + 3 * a2 * b + 3 * a * b2 + b3,
            name: name,
            message: message
        };
        return res;
    };
};