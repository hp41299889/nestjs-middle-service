//packages
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';

//models
import { JSScript } from 'src/models/postgres/jsScript/jsScriptModel.entity';
import { CreateJSExecutionLogDto } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.dto';
import { JSScriptModelService } from 'src/models/postgres/jsScript/jsScriptModel.service';
import { JSExecutionLogModelService } from 'src/models/mongo/js-execution-log/jsExecutionLogModel.service';
//dtos
import { ChildJSDto, JSFileDto } from './childJS.dto';
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

    async execChildJS(dto: ChildJSDto): Promise<void> {
        try {
            this.logger.debug('execChildJS');
            const { scriptID, scriptVersion, input } = dto;
            const jsScript = await this.jsScriptModel.readOneByID(scriptID);
            await this.gernerateJSFile(dto);
            await this.nodeRun(jsScript, scriptVersion, input);
        } catch (err) {
            this.logger.error('execChildJS fail');
            throw err;
        };
    };

    async gernerateJSFile(dto: JSFileDto): Promise<void> {
        try {
            this.logger.debug('gernerateJSFile');
            const { scriptID, scriptVersion } = dto;
            const jsScript = await this.jsScriptModel.readOneByID(scriptID);
            const { scriptName, scriptPackage } = jsScript;
            const cwd = join(this.jsFileDir, scriptName, scriptVersion.toString());
            const jsFile = join(cwd, `${scriptName}.js`);
            await this.createJSFile(jsScript, jsFile);
            await this.npmInit(cwd);
            await this.npmInstall(cwd, scriptPackage);
            await this.addGetArgs(jsFile);
        } catch (err) {
            this.logger.error('gernerateJSFile fail');
            throw err;
        };
    };

    private async createJSFile(jsScript: JSScript, jsFileDir: string): Promise<void> {
        try {
            const { scriptName, scriptVersion, scriptContent } = jsScript;
            const jsVersionDir = join(this.jsFileDir, scriptName, scriptVersion.toString());
            await this.createJSVersionDir(scriptName, jsVersionDir);
            if (!existsSync(jsFileDir)) {
                this.logger.debug('createJSFile');
                writeFileSync(jsFileDir, scriptContent);
            };
        } catch (err) {
            this.logger.error('createJSFile fail');
            throw err;
        };
    };

    private async createJSVersionDir(scriptName: string, jsVersionDir: string): Promise<void> {
        try {
            const jsDir = join(this.jsFileDir, scriptName);
            await this.createJSDir(jsDir);
            if (!existsSync(jsVersionDir)) {
                this.logger.debug('createJSVersionDir');
                mkdirSync(jsVersionDir);
            };
        } catch (err) {
            this.logger.error('createJSVersionDir fail');
            throw err;
        };
    };

    private async createJSDir(jsDir: string): Promise<void> {
        try {
            if (!existsSync(jsDir)) {
                this.logger.debug('createJSDir');
                mkdirSync(jsDir);
            };
        } catch (err) {
            this.logger.error('createJSDir fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async npmInit(cwd: string): Promise<void> {
        try {
            const packageJsonDir = join(cwd, 'package.json');
            if (!existsSync(packageJsonDir)) {
                this.logger.debug('npmInit');
                const cmd = 'npm init -y';
                await this.childService.execChild(cmd, cwd);
            };
        } catch (err) {
            this.logger.error('npmInit fail');
            throw err;
        };
    };

    private async npmInstall(cwd: string, scriptPackage: object): Promise<void> {
        try {
            this.logger.debug('npmInstall');
            const cmd = 'npm install';
            const cmdPackages = await this.addPackages(cmd, scriptPackage);
            this.logger.debug(cmdPackages);
            await this.childService.execChild(cmdPackages, cwd);
        } catch (err) {
            this.logger.error('npmInstall fail');
            throw err;
        };
    };

    private async addGetArgs(jsFile: string): Promise<void> {
        try {
            this.logger.debug('addGetArgs');
            const origin = readFileSync(jsFile);
            const getArgs = `
            const getArgs = () => {
                const args = {};
                let key;
                process.argv.slice(2).forEach((arg, index, array) => {
                    if (arg.startsWith('--')) {
                        key = arg.slice(2);
                        args[key] = '';
                    } else {
                        args[key] += arg;
                        if (array[index + 1] && !array[index + 1].startsWith('--')) {
                            args[key] += ' ';
                        };
                    };
                });
                return args;
            };
            const args = getArgs();
            `;
            writeFileSync(jsFile, getArgs + origin);
        } catch (err) {
            this.logger.error('addGetArgs fail');
            throw err;
        };
    };

    private async addPackages(cmd: string, scriptPackage: object): Promise<string> {
        try {
            this.logger.debug('addPackages');
            if (!scriptPackage) {
                return cmd;
            } else {
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
            };
        } catch (err) {
            this.logger.error('addPackages fail');
            this.logger.error(err);
            throw err;
        };
    };

    private async nodeRun(jsScript: JSScript, jsVersion: number, input: object): Promise<void> {
        try {
            this.logger.debug('nodeRun');
            const { scriptName, scriptID } = jsScript;
            const childLogger = new Logger(scriptName);
            const cmd = `node ${scriptName}.js`;
            const cmdArgs = await this.addArgs(cmd, input);
            const cwd = join(this.jsFileDir, scriptName, jsVersion.toString());
            this.logger.debug(cmdArgs);
            const child = await this.childService.execChild(cmdArgs, cwd);
            //execute success and child success
            child.stdout.on('data', data => {
                childLogger.debug(data);
                const param = JSON.stringify(input);
                const childReturn = JSON.stringify(data);
                const jsExecutionLog: CreateJSExecutionLogDto = {
                    scriptID: scriptID,
                    scriptName: scriptName,
                    scriptVersion: jsVersion,
                    processDatetime: new Date(),
                    processParam: param,
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
                    scriptName: scriptName,
                    scriptVersion: jsVersion,
                    processDatetime: new Date(),
                    processParam: param,
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
                    scriptName: scriptName,
                    scriptVersion: jsVersion,
                    processDatetime: new Date(),
                    processParam: param,
                    processStatus: 'Fail',
                    processReturn: childReturn
                };
                this.jsExecutionLogModel.createOne(jsExecutionLog);
            });
        } catch (err) {
            this.logger.error('nodeRun fail');
            throw err;
        };
    };

    private async addArgs(cmd: string, input: object): Promise<string> {
        try {
            this.logger.debug('addArgs');
            if (!input) {
                return cmd;
            } else {
                Object.keys(input).forEach((key, index, array) => {
                    cmd += ` --${key} ${input[key]}`;
                    if (array[index + 1]) {
                        cmd += ' ';
                    };
                });
                return cmd;
            };
        } catch (err) {
            this.logger.error('addArgs fail');
            this.logger.error(err);
            throw err;
        };
    };
};