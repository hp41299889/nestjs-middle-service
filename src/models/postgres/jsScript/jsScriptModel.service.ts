import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOneJSScriptByIDDto } from 'src/services/jsscript/jsscript.dto';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { JSScript } from './jsScriptModel.entity';

@Injectable()
export class JSScriptModelService {
    constructor(
        @InjectRepository(JSScript)
        private jsScriptRepo: Repository<JSScript>
    ) { };

    private readonly logger = new Logger(JSScriptModelService.name);

    async createOne(jsScript: JSScript): Promise<JSScript> {
        try {
            this.logger.debug('createAJSScript');
            return await this.jsScriptRepo.save(jsScript);
        } catch (err) {
            this.logger.error('createAJSScript fail');
            throw err;
        };
    };

    async readAll(): Promise<JSScript[]> {
        try {
            this.logger.debug('readAllJSScript');
            return await this.jsScriptRepo.find();
        } catch (err) {
            this.logger.error('readAllJSScript fail');
            throw err;
        };
    };

    async readOneByID(scriptID: number): Promise<JSScript> {
        try {
            this.logger.debug('readOneByID');
            return await this.jsScriptRepo.findOneBy({ scriptID: scriptID });
        } catch (err) {
            this.logger.error('readOneByID fail');
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
            throw err;
        };
    };

    async deleteOneByScriptID(scriptID: number): Promise<DeleteResult> {
        try {
            this.logger.debug('deleteAJSScriptByScriptID');
            return await this.jsScriptRepo.delete(scriptID);
        } catch (err) {
            this.logger.error('deleteAJSScriptByScriptID fail');
            throw err;
        };
    };
};