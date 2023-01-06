//packages
import { Controller, Logger, Post, Res, Body, Get, Session } from '@nestjs/common';
import { Response } from 'express';

//dtos
import { QueryJSExecutionLogDto } from './jsExecutionLog.dto';
//services
import { JSExecutionLogService } from './jsExecutionLog.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

@Controller('JSExecutionLog')
export class JSExecutionLogController {
    constructor(
        private readonly httpResponseService: HttpResponseService,
        private readonly jsExecutionLogService: JSExecutionLogService
    ) { };

    private readonly logger = new Logger(JSExecutionLogController.name);

    //TODO render view
    @Get('view')
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/JSExecutionLog/view');
            if (!session.token) {
                res.status(200).render('');
            } else {
                res.status(200).render('');
            };
        } catch (err) {
            this.logger.error('/JSExecutionLog/view fail');
            this.httpResponseService.fail(res, err);
            throw err;
        };
    };

    @Post('query')
    async query(@Res() res: Response, @Body() dto: QueryJSExecutionLogDto): Promise<void> {
        try {
            this.logger.debug('/JSExecutionLog/query');
            const result = await this.jsExecutionLogService.query(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/JSExecutionLog/query fail');
            this.httpResponseService.fail(res, err);
            throw err;
        };
    };
};