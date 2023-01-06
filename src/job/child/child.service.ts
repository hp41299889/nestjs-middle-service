//packages
import { Injectable, Logger } from '@nestjs/common';
import { execSync, exec } from 'child_process';

//models
//services

@Injectable()
export class ChildService {
    private readonly logger = new Logger(ChildService.name);

    async execChild(cmd: string, cwd: string) {
        try {
            const child = exec(cmd, { encoding: 'binary', cwd: cwd });
            return child;
        } catch (err) {
            this.logger.error('execChild fail');
            this.logger.error(err);
            throw err;
        };
    };
};