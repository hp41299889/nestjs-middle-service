import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { JSScript } from 'src/models/postgres/jsScript/jsScript.entity';

@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {

    private readonly logger = new Logger(PostgresService.name);

    createTypeOrmOptions(): TypeOrmModuleOptions {
        try {
            this.logger.debug('Creating connection for postgres');
            return {
                type: 'postgres',
                host: '192.168.36.51',
                port: 5432,
                username: 'postgres',
                password: '69507518',
                database: 'middle-service',
                entities: [JSScript],
                synchronize: true
            };
        } catch (err) {
            this.logger.error('Creating connection for postgres fail');
            throw err;
        };
    };
};
