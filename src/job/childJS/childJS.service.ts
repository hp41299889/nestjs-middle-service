//packages
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

//models
import { JSScript } from 'src/models/postgres/jsScript/jsScriptModel.entity';
import { CreateJSExecutionLogDto } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.dto';
import { JSScriptModelService } from 'src/models/postgres/jsScript/jsScriptModel.service';
import { JSExecutionLogModelService } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.service';
//dtos
import { TestDto } from 'src/services/jsScript/jsScript.dto';
//services
import { ChildService } from '../child/child.service';

@Injectable()
export class ChildJSService {
    constructor(
        private readonly childService: ChildService,
        private readonly jsScriptModel: JSScriptModelService,
        private readonly jsExecutionLogModel: JSExecutionLogModelService,
    ) { };

    private readonly logger = new Logger(ChildJSService.name);
    private readonly jsFileDir = join(process.cwd(), 'jsFile');
    private readonly encoding = 'BIG5';
    private readonly binaryEncoding = 'binary';

    async test(dto: TestDto): Promise<void> {
        try {
            this.logger.debug('test');
            const { scriptID, input } = dto;
            const jsScript = await this.jsScriptModel.readOneByID(scriptID);
            const { scriptName, scriptVersion, scriptContent, scriptPackage } = jsScript;
            const jsScriptDir = join(this.jsFileDir, scriptName);
            const jsVersionDir = join(jsScriptDir, scriptVersion.toString());
            const jsFileDir = join(jsVersionDir, `${scriptName}.js`);
            await this.createJSScriptDir(jsScriptDir);
            await this.createJSVersionDir(jsVersionDir);
            await this.createJSFile(jsFileDir, scriptContent);
            await this.npmInit(jsVersionDir);
            await this.npmInstall(jsVersionDir, scriptPackage);
            await this.nodeRun(jsScript, jsVersionDir, input);
        } catch (err) {
            this.logger.error('test fail');
            throw err;
        };
    };

    private async createJSScriptDir(jsScriptDir: string): Promise<void> {
        try {
            this.logger.debug('createJSScriptDir');
            if (!existsSync(jsScriptDir)) {
                mkdirSync(jsScriptDir);
            };
        } catch (err) {
            this.logger.error('createJSScriptDir fail');
            throw err;
        };
    };

    private async createJSVersionDir(jsVersionDir: string): Promise<void> {
        try {
            this.logger.debug('createJSVersionDir');
            if (!existsSync(jsVersionDir)) {
                mkdirSync(jsVersionDir);
            };
        } catch (err) {
            this.logger.error('createJSVersionDir fail');
            throw err;
        };
    };

    private async createJSFile(jsFileDir: string, scriptContent: string): Promise<void> {
        try {
            this.logger.debug('createJSFile');
            if (!existsSync(jsFileDir)) {
                writeFileSync(jsFileDir, scriptContent);
            };
        } catch (err) {
            this.logger.error('createJSFile fail');
            throw err;
        };
    };

    private async npmInit(jsVersionDir: string) {
        try {
            this.logger.debug('npmInit');
            const cmd = 'npm init -y';
            const cwd = jsVersionDir;
            await this.childService.execChild(cmd, cwd);
        } catch (err) {
            this.logger.error('npmInit fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async npmInstall(jsVersionDir: string, scriptPackage: object) {
        try {
            this.logger.debug('npmInstall');
            const cmd = 'npm install';
            const cwd = jsVersionDir;
            const cmdPackages = await this.addPackages(cmd, scriptPackage);
            await this.childService.execChild(cmdPackages, cwd);
        } catch (err) {
            this.logger.error('npmInstall fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async addPackages(cmd: string, scriptPackage: object) {
        try {
            this.logger.debug('addPackages');
            cmd += ` minimist`;
            Object.keys(scriptPackage).forEach(key => {
                if (scriptPackage[key].charAt(0) == '^') {
                    const packageVersion = scriptPackage[key].slice(1);
                    cmd += ` ${key}@${packageVersion}`;
                } else {
                    const packageVersion = scriptPackage[key];
                    cmd += ` ${key}@${packageVersion}`;
                };
            });
            return cmd;
        } catch (err) {
            this.logger.error('addPackages fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async nodeRun(jsScript: JSScript, jsVersionDir: string, input: object) {
        try {
            this.logger.debug('nodeRun');
            const { scriptName, scriptID, scriptVersion } = jsScript;
            const childLogger = new Logger(scriptName);
            const cmd = `node ${scriptName}.js`;
            const cmdArgs = await this.addArgs(cmd, input);
            const cwd = jsVersionDir;
            const child = await this.childService.execChild(cmdArgs, cwd);
            //execute success and child success
            child.stdout.on('data', data => {
                childLogger.debug(data);
                const param = JSON.stringify(input);
                const childReturn = JSON.stringify(data);
                const jsExecutionLog: CreateJSExecutionLogDto = {
                    scriptID: scriptID,
                    scriptVersion: scriptVersion,
                    processDatetime: new Date(),
                    precessParam: param,
                    processStatus: 'Success',
                    processReturn: childReturn
                };
                this.jsExecutionLogModel.createOne(jsExecutionLog);
            });
            //execute success but child fail
            child.stdout.on('error', error => {
                childLogger.error(error);
                const param = JSON.stringify(input);
                const childReturn = JSON.stringify(error);
                const jsExecutionLog: CreateJSExecutionLogDto = {
                    scriptID: scriptID,
                    scriptVersion: scriptVersion,
                    processDatetime: new Date(),
                    precessParam: param,
                    processStatus: 'Success',
                    processReturn: childReturn
                };
                this.jsExecutionLogModel.createOne(jsExecutionLog);
            });
            //execute fail
            child.stderr.on('error', error => {
                childLogger.error(error);
                const param = JSON.stringify(input);
                const childReturn = JSON.stringify(error);
                const jsExecutionLog: CreateJSExecutionLogDto = {
                    scriptID: scriptID,
                    scriptVersion: scriptVersion,
                    processDatetime: new Date(),
                    precessParam: param,
                    processStatus: 'Fail',
                    processReturn: childReturn
                };
                this.jsExecutionLogModel.createOne(jsExecutionLog);
            });
        } catch (err) {
            this.logger.error('nodeRun fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async addArgs(cmd: string, input: object): Promise<string> {
        try {
            this.logger.debug('addArgs');
            Object.keys(input).forEach(key => {
                cmd += ` --${key}=${input[key]} `;
            });
            return cmd;
        } catch (err) {
            this.logger.error('addArgs fail');
            throw err;
        };
    };
};