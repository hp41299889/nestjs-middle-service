import { Injectable } from '@nestjs/common';
import { writeFileSync, writeFile, createWriteStream } from 'fs';
import { exec, spawn, fork, execFile } from 'child_process';

import { ChildProcessDto } from './child-process.dto';

@Injectable()
export class ChildProcessService {
    async childProcess(data: ChildProcessDto) {
        const { script, name, message } = data;
        const writeJSCb = await this.writeJS(data);
        if (writeJSCb) {
            return writeJSCb;
        } else {
            const output = {
                'your script': script,
                'file name': name,
                'your message': message,
                'node output': await this.runNode(data)
            }
            return output;
        };
    };

    async writeJS(data: ChildProcessDto) {
        return new Promise((resolve, reject) => {
            const { script, name, message } = data;
            console.log('***writeJS***');
            writeFile(`files/${name}.js`, script, err => {
                if (err) {
                    reject(`writeJS error\n${err}`);
                } else {
                    resolve(null);
                };
            });
        }).catch(err => err);
    };

    async runNode(data: ChildProcessDto) {
        return new Promise((resolve, reject) => {
            const { script, name, message } = data;
            console.log('***runNode***');
            exec(`node files/${name}.js`, (err, stdout, stderr) => {
                if (err) {
                    reject(`exec error\n${err}`);
                } else {
                    console.log(`***run node ${name}.js***`);
                    if (stderr) {
                        reject(`run node error\n${stderr}`);
                    } else {
                        resolve(stdout);
                    };
                };
            });
        }).catch(err => err);
    };
};