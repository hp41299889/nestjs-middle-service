//packages
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//dtos
import { RMQMessageDto } from './bossQueue.dto';
import { ChildJSDto } from 'src/job/childJS/childJS.dto';
//services
import { ChildJSService } from 'src/job/childJS/childJS.service';


@Injectable()
export class BossQueueService {
    constructor(
        @Inject('BOSSQUEUE_CONNECTION')
        private readonly client: ClientRMQ,
        private readonly childJSService: ChildJSService
    ) { };

    private readonly logger = new Logger(BossQueueService.name);

    async handleMessage(message: RMQMessageDto) {
        try {
            this.logger.debug('handleMessage');
            const { jsonrpc, method, params } = message;
            await this.checkMessageFormat(message);
            this.logger.warn(message);
            const methodSplit = await this.splitMethod(method);
            const scriptID = +methodSplit[2];
            const scriptVersion = +methodSplit[3];
            const input = {};
            const processParam = params['processParam'];
            Object.keys(processParam).forEach(key => {
                input[key] = processParam[key];
            });
            const dto: ChildJSDto = {
                scriptID: scriptID,
                scriptVersion: +scriptVersion,
                input: input
            };
            await this.childJSService.execChildJS(dto);
        } catch (err) {
            this.logger.error('handleMessage fail');
            throw err;
        };
    };

    async sendClient(message: any) {
        try {
            this.logger.debug('sendClient');
            this.client.emit('', message)
                .pipe(timeout(10000));
        } catch (err) {
            this.logger.error('sendClient fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async checkMessageFormat(message: RMQMessageDto) {
        try {
            this.logger.debug('checkMessageFormat');
            const { jsonrpc, method, params } = message;
            if (jsonrpc != '2.0') {
                throw 'jsonrpc format wrong';
            };
        } catch (err) {
            this.logger.error('checkMessageFormat fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async splitMethod(method: string) {
        try {
            this.logger.debug('splitMethod');
            const splited = method.split('/');
            return splited;
        } catch (err) {
            this.logger.error('splitMethod fail');
            this.logger.error(err);
            throw err;
        };
    };
};