//packages
import { Controller, Logger, Get, Res, Post, Body, Session, Patch } from '@nestjs/common';
import { Response } from 'express';

//dtos
import { DBConnectionDto, SetupSaveDto } from './setup.dto';
//services
import { SetupService } from './setup.service';

@Controller('Setup')
export class SetupController {
    constructor(
        private readonly setupService: SetupService
    ) { };

    private readonly logger = new Logger(SetupController.name);

    //TODO render view
    @Get('view')
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/Setup/view');
            if (!session.token) {
                res.status(200).render('');
            } else {
                res.status(200).render('');
            };
        } catch (err) {
            this.logger.error('/Setup/view fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Get('read')
    async read(@Res() res: Response): Promise<void> {
        try {
            this.logger.debug('/Setup/read');
            const result = await this.setupService.read();
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/Setup/read fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Post('postgresConnectTest')
    async postgresConnectTest(@Res() res: Response, @Body() dto: DBConnectionDto): Promise<void> {
        try {
            this.logger.debug('/Setup/postgresConnectTest');
            const result = await this.setupService.postgresConnectTest(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/Setup/postgresConnectTest fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Post('mongoConnectTest')
    async mongoConnectTest(@Res() res: Response, @Body() dto: DBConnectionDto): Promise<void> {
        try {
            this.logger.debug('/Setup/mongoConnectTest');
            const result = await this.setupService.mongoConnectTest(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/Setup/mongoConnectTest fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Patch('save')
    async save(@Res() res: Response, @Body() dto: SetupSaveDto): Promise<void> {
        try {
            this.logger.debug('/Setup/save');
            const result = await this.setupService.save(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            this.logger.error('/Setup/save fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };
};