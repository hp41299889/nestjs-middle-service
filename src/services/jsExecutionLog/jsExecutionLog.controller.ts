//packages
import { Controller, Logger, Post, Res, Body, Get, Session } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

//configs
import { jSExecutionLogControllerConfig } from 'src/basics/configs/config';
//dtos
import { QueryJSExecutionLogDto } from './jsExecutionLog.dto';
//services
import { JSExecutionLogService } from './jsExecutionLog.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

const {
    prefix,     //JSExecutionLog
    viewRoute,  //view
    queryRoute, //query
} = jSExecutionLogControllerConfig;

@ApiTags('JSExecutionLog')
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
            await this.httpResponseService.renderView(res, session, 'jsExecutionLog');
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