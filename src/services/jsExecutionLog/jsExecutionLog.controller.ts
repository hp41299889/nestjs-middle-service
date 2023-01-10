//packages
import { Controller, Logger, Post, Res, Body, Get, Session } from '@nestjs/common';
import { Response } from 'express';

//configs
import jsExecutionLogConfig from './jsExecutionLog.config';
//dtos
import { QueryJSExecutionLogDto } from './jsExecutionLog.dto';
//services
import { JSExecutionLogService } from './jsExecutionLog.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

const {
    prefix,
    viewRoute,
    queryRoute
} = jsExecutionLogConfig;

@Controller(prefix)
export class JSExecutionLogController {
    constructor(
        private readonly httpResponseService: HttpResponseService,
        private readonly jsExecutionLogService: JSExecutionLogService
    ) { };

    private readonly logger = new Logger(JSExecutionLogController.name);

    //TODO render view
    @Get(viewRoute)
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/JSExecutionLog/view');
            if (!session.token) {
                await this.httpResponseService.renderView(res, 200, 'auth');
            } else {
                await this.httpResponseService.renderView(res, 200, 'jsExecutionLog');
            };
        } catch (err) {
            this.logger.error('/JSExecutionLog/view fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Post(queryRoute)
    async query(@Res() res: Response, @Body() dto: QueryJSExecutionLogDto): Promise<void> {
        try {
            this.logger.debug('/JSExecutionLog/query');
            const result = await this.jsExecutionLogService.query(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/JSExecutionLog/query fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };
};