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

    async read() {
        try {
            this.logger.debug(this.setupFile);
            return readFileSync(this.setupFile, 'utf8');
        } catch (err) {
            throw err;
        };
    };

    async postgresConnectTest(dto: DBConnectionDto) {
        try {
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
                    this.logger.debug('postgresConnectTest success');
                    await connection.destroy();
                    return 'postgresConnectTest success';
                }).catch(err => {
                    this.logger.error(err);
                    throw err;
                });
        } catch (err) {
            throw err;
        };
    };

    async mongoConnectTest(dto: DBConnectionDto) {
        try {
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
                    this.logger.debug('mongoConnectTest success');
                    await connection.destroy();
                    return 'mongoConnectTest success';
                }).catch(err => {
                    this.logger.error(err);
                    throw err;
                });
        } catch (err) {
            throw err;
        };
    };
};