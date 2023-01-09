//packages
import { Controller, Logger, Post, Get, Req, Res, Body, Session } from '@nestjs/common';
import { Request, Response } from 'express';

//configs
import authConfig from './auth.config';
//dtos
import { LoginDto } from '../setup/setup.dto';
//services
import { AuthService } from './auth.service';
import { HttpResponseService } from 'src/utils/httpResponse/httpResponse.service';

const {
    prefix,
    viewRoute,
    loginRoute,
    logoutRoute
} = authConfig;

@Controller(prefix)
export class AuthController {
    constructor(
        private readonly httpResponseService: HttpResponseService,
        private readonly authService: AuthService
    ) { };

    private readonly logger = new Logger(AuthController.name);

    //TODO render view
    @Get(viewRoute)
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/Auth/view');
            if (!session.token) {
                res.status(200).render('');
            } else {
                res.status(200).render('');
            };
        } catch (err) {
            this.logger.error('/Auth/view fail');
            this.httpResponseService.fail(res, err);
            throw err;
        };
    };

    @Post(loginRoute)
    async login(@Res() res: Response, @Body() dto: LoginDto, @Session() session: Record<string, any>): Promise<void> {
        try {
            // this.logger.debug(this.config);
            this.logger.debug('/Auth/login');
            if (!session.token) {
                const result = await this.authService.login(dto);
                session.token = dto.account;
                this.httpResponseService.success(res, 200, result);
            } else {
                this.httpResponseService.success(res, 200, 'session login success');
            };
        } catch (err) {
            this.logger.error('/Auth/login fail');
            this.httpResponseService.fail(res, err);
            throw err;
        };
    };

    @Get(logoutRoute)
    async logout(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/Auth/login');
            if (!session.token) {
                throw 'you are not login yet';
            } else {
                const result = await this.authService.logout(req);
                this.httpResponseService.success(res, 200, result);
            };
        } catch (err) {
            this.logger.error('/Auth/logout fail');
            this.httpResponseService.fail(res, err);
            throw err;
        };
    };
};