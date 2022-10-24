import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PerfectCubicSumDto } from './common/math/math.dto';
import { MathService } from './common/math/math.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    @Post('perfectcubicsum')
    PostPerfectCubicSum(@Body() data: PerfectCubicSumDto) {
        return this.rabbitmqService.sendPerfectCubicSum(data);
    };
};