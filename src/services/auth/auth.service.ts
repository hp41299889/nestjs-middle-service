//packages
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Request } from 'express';

//dtos
import { LoginDto, SetupSaveDto } from '../setup/setup.dto';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);
    private readonly setupFile = join(process.cwd(), 'setup', 'setup.json');

    async login(dto: LoginDto) {
        try {
            this.logger.debug('login');
            const admin = await this.readSetupAdmin();
            const { account, password } = admin;
            await this.checkAccount(dto.account, account);
            await this.checkPassword(dto.password, password);
            return 'login success';
        } catch (err) {
            this.logger.error('login fail');
            this.logger.error(err);
            throw err;
        };
    };

    async logout(req: Request) {
        try {
            this.logger.debug('logout');
            req.session.destroy(() => {
                this.logger.debug('session destoried');
            });
            return 'logout success';
        } catch (err) {
            this.logger.error('logout fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async checkAccount(client: string, account: string) {
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

    private async checkPassword(client: string, password: string) {
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

    private async readSetupAdmin(): Promise<LoginDto> {
        try {
            const setupFile = readFileSync(this.setupFile, 'utf8');
            const setup: SetupSaveDto = JSON.parse(setupFile);
            const { admin } = setup;
            return admin;
        } catch (err) {
            this.logger.error('readSetup fail');
            this.logger.error(err);
            throw err;
        };
    };
};