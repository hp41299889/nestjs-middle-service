//packages
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TimeHelperService {
    private readonly logger = new Logger(TimeHelperService.name);

    async dateStringToNowTimeString(dateString: string) {
        //TODO nowTime or just choose date
        try {
            this.logger.debug('dateStringToNowTimeString');
            const nowDate = new Date(dateString);
            const nowYear = nowDate.getFullYear();
            const nowMonth = nowDate.getMonth();
            const nowDay = nowDate.getDate();
            const now = new Date();
            now.setFullYear(nowYear);
            now.setMonth(nowMonth);
            now.setDate(nowDay);
            return now;
        } catch (err) {
            this.logger.error('dateStringToNowTimeString fail');
            this.logger.error(err);
            throw err;
        };
    };

    async getDayAgoTime(now: Date): Promise<number> {
        try {
            this.logger.debug('getOneDayAgo');
            const nowTime = new Date(now).getTime();
            const dayAgoTime = nowTime - 86400000;
            return dayAgoTime;
        } catch (err) {
            this.logger.error('getOneDayAgo fail');
            this.logger.error(err);
            throw err;
        };
    };

    async getWeekAgoTime(now: Date): Promise<number> {
        try {
            this.logger.debug('getWeekAgoTime');
            const nowTime = new Date(now).getTime();
            const weekAgoTime = nowTime - 86400000 * 7;
            return weekAgoTime;
        } catch (err) {
            this.logger.error('getWeekAgoTime fail');
            this.logger.error(err);
            throw err;
        };
    };

    async getYearAgoTime(now: Date): Promise<number> {
        try {
            this.logger.debug('getYearAgoTime');
            const nowTime = new Date(now).getTime();
            const weekAgoTime = nowTime - 86400000 * 365;
            return weekAgoTime;
        } catch (err) {
            this.logger.error('getYearAgoTime fail');
            this.logger.error(err);
            throw err;
        };
    };
};