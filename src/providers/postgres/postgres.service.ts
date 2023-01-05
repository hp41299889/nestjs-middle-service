//packages
import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

//models
import { JSScript } from 'src/models/postgres/jsScript/jsScriptModel.entity';
//dtos
import { DBConnectionDto } from 'src/services/setup/setup.dto';
//services
import { SetupJsonService } from 'src/utils/setupJson/setupJson.service';


@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
    constructor(
        private readonly setupJsonService: SetupJsonService
    ) { };

    private readonly logger = new Logger(PostgresService.name);

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        try {
            this.logger.debug('Creating connection for postgres');
            const setup: DBConnectionDto = await this.setupJsonService.readByKey('postgreSQL');
            const { account, password, IP, port, DBName } = setup;
            return {
                type: 'postgres',
                host: IP,
                port: +port,
                username: account,
                password: password,
                database: DBName,
                entities: [JSScript],
                synchronize: true
            };
        } catch (err) {
            this.logger.error('Creating connection for postgres fail');
            throw err;
        };
    };
};
