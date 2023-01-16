//packages
import { Injectable, Logger } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

//models
import { JSScript } from 'src/models/postgres/jsScript/jsScriptModel.entity';
import { JSScriptModelService } from 'src/models/postgres/jsScript/jsScriptModel.service';
//dtos
import { CreateOneJSScriptDto, ReadOneJSScriptByIDDto, UpdateOneJSScriptByIDDto, DeleteOneJSScriptByIDDto, PreDto } from './jsScript.dto';
import { ChildJSDto } from 'src/job/childJS/childJS.dto';
//services
import { ChildJSService } from 'src/job/childJS/childJS.service';
import { CommonService } from 'src/utils/common/common.service';

@Injectable()
export class JSScriptService {
    constructor(
        private readonly jsScriptModel: JSScriptModelService,
        private readonly childJSService: ChildJSService,
        private readonly commonService: CommonService
    ) { };

    private readonly logger = new Logger(JSScriptService.name);


    async createOne(dto: CreateOneJSScriptDto): Promise<JSScript> {
        try {
            this.logger.debug('createOne');
            await this.preClean(dto);
            const result = await this.jsScriptModel.createOne(dto);
            this.logger.log(result);
            // await this.childJSService.gernerateJSFile(result);
            return result;
        } catch (err) {
            this.logger.error('createOne fail');
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
            throw err;
        };
    };

    async updateOneByID(dto: UpdateOneJSScriptByIDDto): Promise<UpdateResult> {
        try {
            this.logger.debug('updateOneByID');
            await this.preClean(dto);
            const { scriptID } = dto;
            const result = await this.jsScriptModel.updateOneByScriptID(dto);
            const target = await this.jsScriptModel.readOneByID(scriptID);
            await this.childJSService.gernerateJSFile(target);
            return result;
        } catch (err) {
            this.logger.error('updateOneByID fail');
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
            throw err;
        };
    };

    async testExecChildJS(dto: ChildJSDto): Promise<void> {
        try {
            this.logger.debug('test');
            await this.childJSService.execChildJS(dto);
        } catch (err) {
            this.logger.error('test fail');
            throw err;
        };
    };

    private async preClean(dto: PreDto): Promise<void> {
        try {
            dto.scriptContent = await this.commonService.uglifyContent(dto.scriptContent);
            dto.scriptPackage = dto.scriptPackage ? dto.scriptPackage : null;
        } catch (err) {
            throw err;
        };
    };
};