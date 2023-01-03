import { Injectable, Logger } from '@nestjs/common';
import { MongooseOptionsFactory } from '@nestjs/mongoose';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist';

@Injectable()
export class MongoService implements MongooseOptionsFactory {

    private readonly logger = new Logger(MongoService.name);

    createMongooseOptions(): MongooseModuleOptions {
        try {
            this.logger.debug('Creating connection for mongo');
            return {
                uri: 'mongodb://admin:a3345678@192.168.36.51:27017/test'
            };
        } catch (err) {
            this.logger.error('Creating connection for mongo fail');
            throw err;
        };
    };
};