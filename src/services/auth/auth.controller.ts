//packages
import { Controller, Logger, Post, Get, Req, Res, Body, Session } from '@nestjs/common';
import { Request, Response } from 'express';

//dtos
import { LoginDto } from '../setup/setup.dto';
//services
import { AuthService } from './auth.service';

@Controller('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { };

    private readonly logger = new Logger(AuthController.name);

    @Post('login')
    async login(@Res() res: Response, @Body() dto: LoginDto, @Session() session: Record<string, any>) {
        try {
            this.logger.debug('/Auth/login');
            if (!session.token) {
                session.token = dto.account;
                const result = await this.authService.login(dto);
                res.status(200).json({
                    status: 'success',
                    result: {
                        data: result
                    }
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    result: {
                        data: 'session login success'
                    }
                });
            };
        } catch (err) {
            this.logger.error('/Auth/login fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };

    @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
        try {
            this.logger.debug('/Auth/login');
            if (!session.token) {
                throw 'you are not login yet';
            } else {
                const result = await this.authService.logout(req);
                res.status(200).json({
                    status: 'success',
                    result: {
                        data: result
                    }
                });
            };
        } catch (err) {
            this.logger.error('/Auth/logout fail');
            res.status(400).json({
                status: 'fail',
                result: {
                    error: err
                }
            });
        };
    };
};