//packages
import { Controller, Logger, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';

//dtos
import { QueryJSExecutionLogDto } from './jsExecutionLog.dto';
//services
import { JSExecutionLogService } from './jsExecutionLog.service';

@Controller('JSExecutionLog')
export class JSExecutionLogController {
    constructor(
        private readonly jsExecutionLogService: JSExecutionLogService
    ) { };

    private readonly logger = new Logger(JSExecutionLogController.name);

    @Post('/query')
    async query(@Res() res: Response, @Body() dto: QueryJSExecutionLogDto) {
        try {
            this.logger.debug('/JSExecutionLog/query');
            const result = await this.jsExecutionLogService.query();
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            })
        } catch (err) {
            this.logger.error('/JSExecutionLog/query fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };
};