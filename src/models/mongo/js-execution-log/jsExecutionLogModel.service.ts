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

    async createOne(createJSExecutionLogDto: CreateJSExecutionLogDto): Promise<any> {
        try {
            this.logger.debug('create one');
            const created = new this.jsExecutionLogModel(createJSExecutionLogDto);
            return await created.save();
        } catch (err) {
            this.logger.error('create one fail');
            this.logger.error(err);
            throw err;
        };
    };

    async findAll(): Promise<any> {
        try {
            this.logger.debug('findAll');
            const docs = await this.jsExecutionLogModel.find().exec();
            this.logger.debug(docs);
            return docs;
        } catch (err) {
            this.logger.error('findAll fail');
            this.logger.error(err);
            throw err;
        };
    };

    async findTimePeriod(startTime: number, endTime: number): Promise<any> {
        try {
            this.logger.debug('findTimePeriod');
            const docs = await this.jsExecutionLogModel
                .find()
                .where('processDatetime').gt(startTime).lt(endTime)
                .exec();
            docs.map(doc => {
                doc.logID = JSON.stringify(doc._id);
            });
            this.logger.warn(docs);
            return docs;
        } catch (err) {
            this.logger.error('findTimePeriod fail');
            this.logger.error(err);
            throw err;
        };
    };
};