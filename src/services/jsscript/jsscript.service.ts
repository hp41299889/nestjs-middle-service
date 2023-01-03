import { Injectable, Logger } from '@nestjs/common';

import { JSScript } from 'src/models/postgres/jsScript/jsScript.entity';
import { JSScriptModelService } from 'src/models/postgres/jsScript/jsScript.service';
import { CreateJSScriptDto } from './jsscript.dto';

@Injectable()
export class JSScriptService {
    constructor(
        private readonly jsScriptModel: JSScriptModelService
    ) { };

    private readonly logger = new Logger(JSScriptService.name);

    async create(createJSSCriptDto: CreateJSScriptDto) {
        try {
            this.logger.debug('Handling JSScriptController, create');
            const jsScript = new JSScript();
            jsScript.scriptName = createJSSCriptDto.scriptName;
            jsScript.scriptContent = createJSSCriptDto.scriptContent;
            jsScript.scriptSource = 'api';
            jsScript.scriptVersion = 1;
            const result = await this.jsScriptModel.create(jsScript);
            return result;
        } catch (err) {
            this.logger.error('Handling JSScriptController fail, create');
            throw err;
        };
    };
};