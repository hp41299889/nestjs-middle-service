//packages
import { Controller, Logger, Get, Res, Post, Body, Session, Patch } from '@nestjs/common';
import { Response } from 'express';

//configs
import setupConfig from './setup.config';
//dtos
import { DBConnectionDto, SetupSaveDto } from './setup.dto';
//services
import { SetupService } from './setup.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

const {
    prefix,
    viewRoute,
    readRoute,
    postgresConnectTestRoute,
    mongoConnectTestRoute,
    saveRoute
} = setupConfig;

@Controller(prefix)
export class SetupController {
    constructor(
        private readonly httpResponseService: HttpResponseService,
        private readonly setupService: SetupService
    ) { };

    private readonly logger = new Logger(SetupController.name);

    //TODO render view
    @Get(viewRoute)
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/Setup/view');
            if (!session.token) {
                await this.httpResponseService.redirectView(res, 200, '/MiddleService/Auth/view');
            } else {
                await this.httpResponseService.renderView(res, 200, 'setup');
            };
        } catch (err) {
            this.logger.error('/Setup/view fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Get(readRoute)
    async read(@Res() res: Response): Promise<void> {
        try {
            this.logger.debug('/Setup/read');
            const result = await this.setupService.read();
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/Setup/read fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Post(postgresConnectTestRoute)
    async postgresConnectTest(@Res() res: Response, @Body() dto: DBConnectionDto): Promise<void> {
        try {
            this.logger.debug('/Setup/postgresConnectTest');
            const result = await this.setupService.postgresConnectTest(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/Setup/postgresConnectTest fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Post(mongoConnectTestRoute)
    async mongoConnectTest(@Res() res: Response, @Body() dto: DBConnectionDto): Promise<void> {
        try {
            this.logger.debug('/Setup/mongoConnectTest');
            const result = await this.setupService.mongoConnectTest(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/Setup/mongoConnectTest fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Patch(saveRoute)
    async save(@Res() res: Response, @Body() dto: SetupSaveDto): Promise<void> {
        try {
            this.logger.debug('/Setup/save');
            const result = await this.setupService.save(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/Setup/save fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };
};