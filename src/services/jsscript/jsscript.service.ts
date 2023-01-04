//packages
import { Injectable, Logger } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

//models
import { JSScript } from 'src/models/postgres/jsScript/jsScriptModel.entity';
import { JSScriptModelService } from 'src/models/postgres/jsScript/jsScriptModel.service';
//dtos
import { CreateOneJSScriptDto, ReadOneJSScriptByIDDto, UpdateOneJSScriptByIDDto, DeleteOneJSScriptByIDDto, TestDto } from './jsScript.dto';
//services
import { ChildJSService } from 'src/job/childJS/childJS.service';

@Injectable()
export class JSScriptService {
    constructor(
        private readonly jsScriptModel: JSScriptModelService,
        private readonly childJSService: ChildJSService
    ) { };

    private readonly logger = new Logger(JSScriptService.name);

    async createOne(dto: CreateOneJSScriptDto): Promise<JSScript> {
        try {
            this.logger.debug('createOne');
            const jsScript = new JSScript();
            jsScript.scriptName = dto.scriptName;
            jsScript.scriptContent = dto.scriptContent;
            jsScript.scriptSource = 'api';
            jsScript.scriptVersion = 1;
            const result = await this.jsScriptModel.createOne(jsScript);
            return result;
        } catch (err) {
            this.logger.error('createOne fail');
            this.logger.error(err);
            throw err;
        };
    };

    async readAll(): Promise<JSScript[]> {
        try {
            this.logger.debug('readAll');
            const result = await this.jsScriptModel.readAll();
            return result;
        } catch (err) {
            this.logger.error('readAll, fail');
            this.logger.error(err);
            throw err;
        };
    };

    async readOneByID(dto: ReadOneJSScriptByIDDto): Promise<JSScript> {
        try {
            this.logger.debug('readOneByID');
            const result = await this.jsScriptModel.readOneByID(dto.scriptID);
            return result;
        } catch (err) {
            this.logger.error('readOneByID fail');
            this.logger.error(err);
            throw err;
        };
    };

    async updateOneByID(dto: UpdateOneJSScriptByIDDto): Promise<UpdateResult> {
        try {
            this.logger.debug('updateOneByID');
            const jsScript = new JSScript();
            jsScript.scriptName = dto.scriptName;
            jsScript.scriptContent = dto.scriptContent;
            const result = await this.jsScriptModel.updateOneByScriptID(dto);
            return result;
        } catch (err) {
            this.logger.error('updateOneByID fail');
            this.logger.error(err);
            throw err;
        };
    };

    async deleteOneByID(dto: DeleteOneJSScriptByIDDto): Promise<DeleteResult> {
        try {
            this.logger.debug('DeleteOneByID');
            const result = await this.jsScriptModel.deleteOneByScriptID(dto.scriptID);
            return result;
        } catch (err) {
            this.logger.error('DeleteOneByID fail');
            this.logger.error(err);
            throw err;
        };
    };

    async test(dto: TestDto): Promise<void> {
        try {
            this.logger.debug('test');
            const result = await this.childJSService.test(dto);
            return result;
        } catch (err) {
            this.logger.error('test fail');
            this.logger.error(err);
            throw err;
        };
    };
};