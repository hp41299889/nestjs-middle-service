//packages
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

//models
import { JSScript } from './jsScriptModel.entity';
//dtos
import { CreateOneJSScriptDto, UpdateOneJSScriptByIDDto } from 'src/services/jsScript/jsScript.dto';

@Injectable()
export class JSScriptModelService {
    constructor(
        @InjectRepository(JSScript)
        private jsScriptRepo: Repository<JSScript>
    ) { };

    private readonly logger = new Logger(JSScriptModelService.name);

    async createOne(dto: CreateOneJSScriptDto): Promise<JSScript> {
        try {
            this.logger.debug('createAJSScript');
            const { scriptName, scriptContent, scriptPackage, scriptSource } = dto;
            const jsScript = new JSScript();
            jsScript.scriptName = scriptName;
            jsScript.scriptContent = scriptContent;
            jsScript.scriptPackage = scriptPackage;
            jsScript.scriptSource = scriptSource;
            jsScript.scriptVersion = 1;
            return await this.jsScriptRepo.save(jsScript);
        } catch (err) {
            this.logger.error('createAJSScript fail');
            this.logger.error(err);
            throw err;
        };
    };

    async readAll(): Promise<JSScript[]> {
        try {
            this.logger.debug('readAllJSScript');
            return await this.jsScriptRepo.find();
        } catch (err) {
            this.logger.error('readAllJSScript fail');
            this.logger.error(err);
            throw err;
        };
    };

    async readOneByID(scriptID: number): Promise<JSScript> {
        try {
            this.logger.debug('readOneByID');
            return await this.jsScriptRepo.findOneBy({ scriptID: scriptID });
        } catch (err) {
            this.logger.error('readOneByID fail');
            this.logger.error(err);
            throw err;
        };
    };

    //TODO more elegant
    async updateOneByScriptID(dto: UpdateOneJSScriptByIDDto): Promise<UpdateResult> {
        try {
            this.logger.debug('updateAJSScriptByScriptID');
            await this.jsScriptRepo.update({ scriptID: dto.scriptID }, dto);
            return await this.jsScriptRepo.increment({ scriptID: dto.scriptID }, 'scriptVersion', 1);
        } catch (err) {
            this.logger.error('updateAJSScriptByScriptID fail');
            this.logger.error(err);
            throw err;
        };
    };

    async deleteOneByScriptID(scriptID: number): Promise<DeleteResult> {
        try {
            this.logger.debug('deleteAJSScriptByScriptID');
            return await this.jsScriptRepo.delete(scriptID);
        } catch (err) {
            this.logger.error('deleteAJSScriptByScriptID fail');
            this.logger.error(err);
            throw err;
        };
    };
};