import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JSExecutionLog, JSExecutionLogDocument } from './jsExecutionLog.schema';

@Injectable()
export class JSExecutionLogService {
    constructor(
        @InjectModel(JSExecutionLog.name)
        private jsExecutionLogModel: Model<JSExecutionLogDocument>
    ) { };

    private readonly logger = new Logger(JSExecutionLogService.name);

};