//packages
import { Controller, Logger, Post, Get, Patch, Delete, Body, Res, Session } from '@nestjs/common';
import { Response } from 'express';

//configs
import { jsScriptControllerConfig } from 'src/basics/configs/config';
//dtos
import { CreateOneJSScriptDto, DeleteOneJSScriptByIDDto, ReadOneJSScriptByIDDto, UpdateOneJSScriptByIDDto } from './jsScript.dto';
import { ChildJSDto } from 'src/job/childJS/childJS.dto';
//services
import { JSScriptService } from './jsScript.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

const {
    prefix,         //JSScript
    viewRoute,      //view
    createRoute,    //create
    readAllRoute,   //readAll
    queryRoute,     //query
    updateRoute,    //update
    deleteRoute,    //delete
    testRoute,      //test
} = jsScriptControllerConfig;

@Controller(prefix)
export class JSScriptController {
    constructor(
        private readonly httpResponseService: HttpResponseService,
        private readonly jsScriptService: JSScriptService,
    ) { };

    private readonly logger = new Logger(JSScriptController.name);

    @Get(viewRoute)
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/JSScript/view');
            await this.httpResponseService.renderView(res, session, 'jsScript');
        } catch (err) {
            this.logger.error('/JSScript/view fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Post(createRoute)
    async createOne(@Res() res: Response, @Body() dto: CreateOneJSScriptDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/create');
            dto.scriptSource = 'api';
            const result = await this.jsScriptService.createOne(dto);
            this.httpResponseService.success(res, 201, result);
        } catch (err) {
            this.logger.error('/JSScript/create fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Get(readAllRoute)
    async readAll(@Res() res: Response): Promise<void> {
        try {
            this.logger.debug('/JSScript/readAll ');
            const result = await this.jsScriptService.readAll();
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/JSScript/readAll fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Get(queryRoute)
    async readOneByID(@Res() res: Response, @Body() dto: ReadOneJSScriptByIDDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/readOneByID');
            const result = await this.jsScriptService.readOneByID(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/JSScript/readOneByID fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Patch(updateRoute)
    async updateOneByID(@Res() res: Response, @Body() dto: UpdateOneJSScriptByIDDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/update');
            const result = await this.jsScriptService.updateOneByID(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/JSScript/update fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Delete(deleteRoute)
    async deleteOneByID(@Res() res: Response, @Body() dto: DeleteOneJSScriptByIDDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/delete');
            const result = await this.jsScriptService.deleteOneByID(dto);
            this.httpResponseService.success(res, 200, result);
        } catch (err) {
            this.logger.error('/JSScript/delete fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Post(testRoute)
    async test(@Res() res: Response, @Body() dto: ChildJSDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/test');
            await this.jsScriptService.testExecChildJS(dto);
            this.httpResponseService.success(res, 200, 'childJS executed');
        } catch (err) {
            this.logger.error('/JSScript/test fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };
};