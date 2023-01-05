//packages
import { Injectable, Logger } from '@nestjs/common';

//models
import { JSExecutionLogModelService } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.service';
//dtos
import { QueryJSExecutionLogDto } from './jsExecutionLog.dto';
//services
import { TimeHelperService } from 'src/utils/timeHelper/timeHelper.service';

@Injectable()
export class JSExecutionLogService {
    constructor(
        private readonly jsScriptModel: JSExecutionLogModelService,
        private readonly timeHelperService: TimeHelperService
    ) { };

    private readonly logger = new Logger(JSExecutionLogService.name);

    async query(dto: QueryJSExecutionLogDto) {
        try {
            this.logger.debug('query');
            const { startDate, dateInterval } = dto;
            const now = await this.timeHelperService.dateStringToNowTimeString(startDate);
            const endTime = now.getTime();
            switch (dateInterval) {
                case '前一日': {
                    const startTime = await this.timeHelperService.getDayAgoTime(now);
                    return await this.jsScriptModel.findTimePeriod(startTime, endTime);
                };
                case '前一月': {
                    const startTime = await this.timeHelperService.getWeekAgoTime(now);
                    return await this.jsScriptModel.findTimePeriod(startTime, endTime);
                };
                case '前一年': {
                    const startTime = await this.timeHelperService.getYearAgoTime(now);
                    return await this.jsScriptModel.findTimePeriod(startTime, endTime);
                };
            };
        } catch (err) {
            this.logger.error('query fail');
            this.logger.error(err);
            throw err;
        };
    };
};