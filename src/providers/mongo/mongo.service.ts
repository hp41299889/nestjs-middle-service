//packages
import { Injectable, Logger } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

//dtos
import { DBConnectionDto } from 'src/services/setup/setup.dto';
//services
import { SetupJsonService } from 'src/utils/setupJson/setupJson.service';

@Injectable()
export class MongoService implements MongooseOptionsFactory {
    constructor(
        private readonly setupJsonService: SetupJsonService
    ) { };
    private readonly logger = new Logger(MongoService.name);

    async createMongooseOptions(): Promise<MongooseModuleOptions> {
        try {
            this.logger.debug('Creating connection for mongo');
            const setup: DBConnectionDto = await this.setupJsonService.readByKey('mongoDB');
            const { account, password, IP, port, DBName } = setup;
            const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
            return { uri };
        } catch (err) {
            this.logger.error('Creating connection for mongo fail');
            throw err;
        };
    };
};