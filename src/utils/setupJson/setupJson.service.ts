//packages
import { Injectable, Logger } from "@nestjs/common";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

//dtos
import { SetupSaveDto } from "src/services/setup/setup.dto";

@Injectable()
export class SetupJsonService {

    private readonly logger = new Logger(SetupJsonService.name);
    private readonly setupFile = join(process.cwd(), 'setup', 'setup.json');

    async read(): Promise<any> {
        try {
            this.logger.debug('read');
            const setup = readFileSync(this.setupFile, 'utf8');
            return JSON.parse(setup);
        } catch (err) {
            this.logger.error('read fail');
            this.logger.error(err);
            throw err;
        };
    };

    async readByKey(key: string): Promise<any> {
        try {
            this.logger.debug('readByKey');
            const setupKey = await this.read();
            return setupKey[key];
        } catch (err) {
            this.logger.error('readByKey fail');
            this.logger.error(err);
            throw err;
        };
    };

    async save(dto: SetupSaveDto): Promise<void> {
        try {
            this.logger.debug('save');
            const setupJson = await this.read();
            Object.keys(dto).forEach(key => {
                setupJson[key] = dto[key];
            });
            writeFileSync(this.setupFile, JSON.stringify(setupJson, null, 2));
        } catch (err) {
            this.logger.error('save fail');
            this.logger.error(err);
            throw err;
        };
    };
};