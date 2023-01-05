//packages
import { Injectable, Logger } from '@nestjs/common';

//models
import { JSExecutionLogModelService } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.service';
//dtos
import { QueryJSExecutionLogDto } from './jsExecutionLog.dto';

@Injectable()
export class JSExecutionLogService {
    constructor(
        private readonly jsScriptModel: JSExecutionLogModelService
    ) { };

    private readonly logger = new Logger(JSExecutionLogService.name);

    async query() {
        try {
            this.logger.debug('query');
            return await this.jsScriptModel.findAll();
        } catch (err) {
            this.logger.error('query fail');
            this.logger.error(err);
            throw err;
        };
    };
};