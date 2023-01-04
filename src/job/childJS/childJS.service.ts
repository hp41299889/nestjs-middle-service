import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';

import { JSScript } from 'src/models/postgres/jsScript/jsScriptModel.entity';
import { JSScriptModelService } from 'src/models/postgres/jsScript/jsScriptModel.service';
import { TestDto } from 'src/services/jsscript/jsscript.dto';
import { CreateJSExecutionLogDto } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.dto';
import { JSExecutionLogModelService } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.service';

@Injectable()
export class ChildJSService {
    constructor(
        private readonly jsScriptModel: JSScriptModelService,
        private readonly jsExecutionLogModel: JSExecutionLogModelService
    ) { };

    private readonly logger = new Logger(ChildJSService.name);
    private readonly jsFileDir = join(process.cwd(), 'jsFile');
    private readonly encoding = 'BIG5';
    private readonly binaryEncoding = 'binary';

    async test(dto: TestDto): Promise<void> {
        try {
            const jsScript = await this.jsScriptModel.readOneByID(dto.scriptID);
            const { scriptName, scriptVersion, scriptContent } = jsScript;
            const jsScriptDir = join(this.jsFileDir, scriptName);
            const jsVersionDir = join(jsScriptDir, scriptVersion.toString());
            const jsFileDir = join(jsVersionDir, `${scriptName}.js`);
            await this.createJSScriptDir(jsScriptDir);
            await this.createJSVersionDir(jsVersionDir);
            await this.createJSFile(jsFileDir, scriptContent);
            await this.executeChildJS(jsFileDir, dto.input, jsScript);
        } catch (err) {
            throw err;
        };
    };

    async createJSScriptDir(jsScriptDir: string): Promise<void> {
        try {
            if (!existsSync(jsScriptDir)) {
                mkdirSync(jsScriptDir);
            };
        } catch (err) {
            throw err;
        };
    };

    async createJSVersionDir(jsVersionDir: string): Promise<void> {
        try {
            if (!existsSync(jsVersionDir)) {
                mkdirSync(jsVersionDir);
            };
        } catch (err) {
            throw err;
        };
    };

    async createJSFile(jsFileDir: string, scriptContent: string): Promise<void> {
        try {
            if (!existsSync(jsFileDir)) {
                writeFileSync(jsFileDir, scriptContent);
            };
        } catch (err) {
            throw err;
        };
    };

    async executeChildJS(jsFileDir: string, input: object, jsScript: JSScript) {
        try {
            const childLogger = new Logger(`${jsScript.scriptName}_V${jsScript.scriptVersion}`);
            const cmd = `node ${jsFileDir} `;
            const cmdArgs = await this.addArgs(cmd, input);
            const child = exec(cmdArgs, { encoding: 'binary' }, err => {
                // if (err) {
                //     this.logger.error(err);
                //     const createJSExecutionLogDto: CreateJSExecutionLogDto = {
                //         scriptID: jsScript.scriptID,
                //         scriptVersion: jsScript.scriptVersion,
                //         processDatetime: new Date(),
                //         precessParam: JSON.stringify(input),
                //         processStatus: 'child execute fail',
                //         processReturn: err.message
                //     };
                //     this.jsExecutionLogModel.createOne(createJSExecutionLogDto);
                // };
            });
            child.stdout.on('data', data => {
                childLogger.log(data);
                const createJSExecutionLogDto: CreateJSExecutionLogDto = {
                    scriptID: jsScript.scriptID,
                    scriptVersion: jsScript.scriptVersion,
                    processDatetime: new Date(),
                    precessParam: JSON.stringify(input),
                    processStatus: 'ok',
                    processReturn: data
                };
                this.jsExecutionLogModel.createOne(createJSExecutionLogDto);
            })
            child.stdout.on('error', err => {
                childLogger.error(err);
                const createJSExecutionLogDto: CreateJSExecutionLogDto = {
                    scriptID: jsScript.scriptID,
                    scriptVersion: jsScript.scriptVersion,
                    processDatetime: new Date(),
                    precessParam: JSON.stringify(input),
                    processStatus: 'js script fail',
                    processReturn: err.message
                };
                this.jsExecutionLogModel.createOne(createJSExecutionLogDto);
            });
            child.stderr.on('data', err => {
                childLogger.error(err);
                const createJSExecutionLogDto: CreateJSExecutionLogDto = {
                    scriptID: jsScript.scriptID,
                    scriptVersion: jsScript.scriptVersion,
                    processDatetime: new Date(),
                    precessParam: JSON.stringify(input),
                    processStatus: 'js script fail',
                    processReturn: err.message
                };
                this.jsExecutionLogModel.createOne(createJSExecutionLogDto);
            });
            return child;
        } catch (err) {
            throw err;
        };
    };

    async addArgs(cmd: string, input: object): Promise<string> {
        try {
            Object.keys(input).forEach(key => {
                cmd += `--${key}=${input[key]} `;
            });
            return cmd;
        } catch (err) {
            throw err;
        };
    };
};