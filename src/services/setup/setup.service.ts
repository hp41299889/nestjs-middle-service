//packages
import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DataSource } from 'typeorm';

//dtos
import { DBConnectionDto } from './setup.dto';

@Injectable()
export class SetupService {

    private readonly logger = new Logger(SetupService.name);
    private readonly setupFile = join(process.cwd(), 'setup', 'setup.json');

    async read(): Promise<string> {
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

    async postgresConnectTest(dto: DBConnectionDto): Promise<string> {
        try {
            this.logger.debug('postgresConnectTest');
            const { account, password, IP, port, DBName } = dto;
            const datasource = new DataSource({
                type: 'postgres',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName
            });
            return await datasource.initialize()
                .then(async connection => {
                    await connection.destroy();
                    return 'postgresConnectTest success';
                }).catch(err => {
                    this.logger.error(err);
                    throw err;
                });
        } catch (err) {
            this.logger.error('postgresConnectTest fail');
            this.logger.error(err);
            throw err;
        };
    };

    async mongoConnectTest(dto: DBConnectionDto): Promise<string> {
        try {
            this.logger.debug('mongoConnectTest');
            const { account, password, IP, port, DBName } = dto;
            const datasource = new DataSource({
                type: 'mongodb',
                username: account,
                password: password,
                host: IP,
                port: +port,
                database: DBName,
                useUnifiedTopology: true
            });
            return await datasource.initialize()
                .then(async connection => {
                    await connection.destroy();
                    return 'mongoConnectTest success';
                }).catch(err => {
                    this.logger.error(err);
                    throw err;
                });
        } catch (err) {
            this.logger.error('mongoConnectTest fail');
            this.logger.error(err);
            throw err;
        };
    };
};