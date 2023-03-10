//packages
import { Controller, Logger, Get, Res, Post, Body, Patch, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

//configs
import { setupControllerConfig } from 'src/basics/configs/config';
//dtos
import { DBConnectionDto, SetupSaveDto } from './setup.dto';
//services
import { SetupService } from './setup.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

const {
    prefix,                     //Setup
    viewRoute,                  //view
    readRoute,                  //read
    postgresConnectTestRoute,   //postgreConnectTest
    mongoConnectTestRoute,      //mongoConnectTest
    saveRoute,                  //save
} = setupControllerConfig;

@ApiTags('Setup')
@Controller(prefix)
export class SetupController {
    constructor(
        private readonly httpResponseService: HttpResponseService,
        private readonly setupService: SetupService
    ) { };

    private readonly logger = new Logger(SetupController.name);

    //TODO render view
    @Get(viewRoute)
    async view(@Res() res: Response): Promise<void> {
        try {
            this.logger.debug('/Setup/view');
            await this.httpResponseService.renderView(res, 'setup');
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
    async save(@Req() req: Request, @Res() res: Response, @Body() dto: SetupSaveDto): Promise<void> {
        try {
            this.logger.debug('/Setup/save');
            await this.setupService.save(dto);
            req.session.destroy(() => {
                res.redirect('/MiddleService/Auth/view');
            });
        } catch (err) {
            this.logger.error('/Setup/save fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };
};