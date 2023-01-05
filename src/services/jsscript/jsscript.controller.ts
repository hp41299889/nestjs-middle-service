//packages
import { Controller, Logger, Post, Get, Patch, Delete, Body, Res, Session } from '@nestjs/common';
import { Response } from 'express';

//dtos
import { CreateOneJSScriptDto, DeleteOneJSScriptByIDDto, ReadOneJSScriptByIDDto, TestDto, UpdateOneJSScriptByIDDto } from './jsScript.dto';
//services
import { JSScriptService } from './jsScript.service';

@Controller('JSScript')
export class JSScriptController {
    constructor(
        private readonly jsScriptService: JSScriptService,
    ) { };

    private readonly logger = new Logger(JSScriptController.name);

    //TODO render view
    @Get('view')
    async view(@Res() res: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.debug('/JSScript/view');
            if (!session.token) {
                res.status(200).render('');
            } else {
                res.status(200).render('');
            };
        } catch (err) {
            this.logger.error('/JSScript/view fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Post('/create')
    async createOne(@Res() res: Response, @Body() dto: CreateOneJSScriptDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/create');
            const result = await this.jsScriptService.createOne(dto);
            res.status(201).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/JSScript/create fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Get('/readAll')
    async readAll(@Res() res: Response): Promise<void> {
        try {
            this.logger.debug('/JSScript/readAll ');
            const result = await this.jsScriptService.readAll();
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/JSScript/readAll fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Get('/query')
    async readOneByID(@Res() res: Response, @Body() dto: ReadOneJSScriptByIDDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/readOneByID');
            const result = await this.jsScriptService.readOneByID(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/JSScript/readOneByID fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Patch('/update')
    async updateOneByID(@Res() res: Response, @Body() dto: UpdateOneJSScriptByIDDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/update');
            const result = await this.jsScriptService.updateOneByID(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/JSScript/update fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Delete('/delete')
    async deleteOneByID(@Res() res: Response, @Body() dto: DeleteOneJSScriptByIDDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/delete');
            const result = await this.jsScriptService.deleteOneByID(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/JSScript/delete fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Post('/test')
    async test(@Res() res: Response, @Body() dto: TestDto): Promise<void> {
        try {
            this.logger.debug('/JSScript/test');
            await this.jsScriptService.test(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: 'child process executed'
                }
            });
        } catch (err) {
            this.logger.error('/JSScript/test fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };
};