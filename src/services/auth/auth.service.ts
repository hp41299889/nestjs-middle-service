//packages
import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

//dtos
import { LoginDto, } from '../setup/setup.dto';
//services
import { SetupJsonService } from 'src/utils/setupJson/setupJson.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly setupJsonService: SetupJsonService
    ) { };
    private readonly logger = new Logger(AuthService.name);

    async login(dto: LoginDto): Promise<void> {
        try {
            this.logger.debug('login');
            const admin: LoginDto = await this.setupJsonService.readByKey('admin');
            const { account, password } = admin;
            await this.checkAccount(dto.account, account);
            await this.checkPassword(dto.password, password);
        } catch (err) {
            this.logger.error('login fail');
            throw err;
        };
    };

    async logout(req: Request): Promise<void> {
        try {
            this.logger.debug('logout');
            req.session.destroy(() => {
                this.logger.debug('session destoried');
            });
        } catch (err) {
            this.logger.error('logout fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async checkAccount(client: string, account: string): Promise<void> {
        try {
            this.logger.debug('checkAccount');
            if (client != account) {
                throw 'account error';
            };
        } catch (err) {
            this.logger.error('checkAccount fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async checkPassword(client: string, password: string): Promise<void> {
        try {
            this.logger.debug('checkPassword');
            if (client != password) {
                throw 'password error';
            };
        } catch (err) {
            this.logger.error('checkPassword fail');
            this.logger.error(err);
            throw err;
        };
    };
};