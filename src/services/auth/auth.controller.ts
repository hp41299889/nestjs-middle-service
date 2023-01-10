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
    private readonly loginRedirectUrl = '/MiddleService/JSScript/view';
    private readonly logoutRedirectUrl = '/MiddleService/Auth/view';

    @Get(viewRoute)
    async view(@Res() res: Response, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/Auth/view');
            await this.httpResponseService.renderView(res, session, 'auth');
        } catch (err) {
            this.logger.error('/Auth/view fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };

    @Post(loginRoute)
    async login(@Res() res: Response, @Body() dto: LoginDto, @Session() session: Record<string, any>): Promise<void> {
        try {
            this.logger.debug('/Auth/login');
            if (!session.token) {
                await this.authService.login(dto);
                session.token = dto.account;
                await this.httpResponseService.redirectUrl(res, 200, this.loginRedirectUrl);
            } else {
                await this.httpResponseService.redirectUrl(res, 200, this.loginRedirectUrl);
            };
        } catch (err) {
            this.logger.error('/Auth/login fail');
            this.httpResponseService.fail(res, 400, err);
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
                await this.authService.logout(req);
                await this.httpResponseService.redirectUrl(res, 200, this.logoutRedirectUrl);
            };
        } catch (err) {
            this.logger.error('/Auth/logout fail');
            this.httpResponseService.fail(res, 400, err);
            throw err;
        };
    };
};