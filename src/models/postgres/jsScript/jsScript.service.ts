import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JSScript } from './jsScript.entity';

@Injectable()
export class JSScriptModelService {
    constructor(
        @InjectRepository(JSScript)
        private jsScriptRepo: Repository<JSScript>
    ) { };

    private readonly logger = new Logger(JSScriptModelService.name);

    async create(jsScript: JSScript): Promise<JSScript> {
        try {
            this.logger.debug('Create a JSScript');
            return await this.jsScriptRepo.save(jsScript);
        } catch (err) {
            this.logger.error(err);
            throw err;
        };
    };


};