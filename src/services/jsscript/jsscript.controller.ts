import { Controller, Logger, Post, Get, Patch, Delete, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateJSScriptDto } from './jsscript.dto';
import { JSScriptService } from './jsscript.service';

@Controller('JSScript')
export class JSScriptController {
    constructor(
        private readonly jsScriptService: JSScriptService,
    ) { };

    private readonly logger = new Logger(JSScriptController.name);

    @Post('/create')
    async create(@Res() res: Response, @Body() createJSSCriptDto: CreateJSScriptDto) {
        try {
            this.logger.debug('Get http request, /JSScript/create');
            const result = await this.jsScriptService.create(createJSSCriptDto);
            res.status(201).json({
                result: 'success',
                data: result
            });
        } catch (err) {
            this.logger.error('Get http request fail, /JSScript/create');
            res.status(400).json({
                result: 'fail',
                data: err
            });
        };
    };
};