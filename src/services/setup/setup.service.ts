//packages
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

//dtos
import { DBConnectionDto, SetupSaveDto } from './setup.dto';
//services
import { SetupJsonService } from 'src/utils/setupJson/setupJson.service';

@Injectable()
export class SetupService {
    constructor(
        private readonly setupJsonService: SetupJsonService
    ) { };
    private readonly logger = new Logger(SetupService.name);

    async read(): Promise<string> {
        try {
            this.logger.debug('read');
            const json = await this.setupJsonService.read();
            return json;
        } catch (err) {
            this.logger.error('read fail');
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
                    throw err;
                });
        } catch (err) {
            this.logger.error('mongoConnectTest fail');
            this.logger.error(err);
            throw err;
        };
    };

    async save(dto: SetupSaveDto): Promise<void> {
        try {
            this.logger.debug('save');
            await this.setupJsonService.save(dto);
            await this.restart();
        } catch (err) {
            this.logger.error('save fail');
            throw err;
        };
    };

    private async restart(): Promise<void> {
        try {
            this.logger.debug('file changed, server restarting');
        } catch (err) {
            this.logger.error('restart fail');
            this.logger.error(err);
            throw err;
        };
    };
};