//packages
import { Controller, Logger, Get, Res, Post, Body } from '@nestjs/common';
import { Response } from 'express';

//dtos
import { DBConnectionDto } from './setup.dto';
//services
import { SetupService } from './setup.service';

@Controller('Setup')
export class SetupController {
    constructor(
        private readonly setupService: SetupService
    ) { };

    private readonly logger = new Logger(SetupController.name);

    @Get('read')
    async read(@Res() res: Response) {
        try {
            const result = await this.setupService.read();
            res.status(200).json({
                status: 'success',
                result: {
                    data: JSON.parse(result)
                }
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Post('postgresConnectTest')
    async postgresConnectTest(@Res() res: Response, @Body() dto: DBConnectionDto) {
        try {
            const result = await this.setupService.postgresConnectTest(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Post('mongoConnectTest')
    async mongoConnectTest(@Res() res: Response, @Body() dto: DBConnectionDto) {
        try {
            const result = await this.setupService.mongoConnectTest(dto);
            res.status(200).json({
                status: 'success',
                result: {
                    data: result
                }
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };
};