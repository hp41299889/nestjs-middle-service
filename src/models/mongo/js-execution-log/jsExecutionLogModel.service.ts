//packages
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//models
import { JSExecutionLog, JSExecutionLogDocument } from './jsExecutionLogModel.schema';
//dtos
import { CreateJSExecutionLogDto } from './jsExecutionLogModel.dto';


@Injectable()
export class JSExecutionLogModelService {
    constructor(
        @InjectModel(JSExecutionLog.name, 'MONGO_CONNECTION')
        private jsExecutionLogModel: Model<JSExecutionLogDocument>
    ) { };

    private readonly logger = new Logger(JSExecutionLogModelService.name);

    async createOne(createJSExecutionLogDto: CreateJSExecutionLogDto) {
        try {
            this.logger.debug('create one');
            const created = new this.jsExecutionLogModel(createJSExecutionLogDto);
            return await created.save();
        } catch (err) {
            this.logger.error(err);
            throw err;
        };
    };

    async findAll() {
        try {
            this.logger.debug('findAll');
            const docs = await this.jsExecutionLogModel.find().exec();
            this.logger.debug(docs);
            return docs;
        } catch (err) {
            this.logger.error(err);
            throw err;
        };
    };
};