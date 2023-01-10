export class CreateJSExecutionLogDto {
    scriptID: number;
    scriptName: string;
    scriptVersion: number;
    processDatetime: Date;
    processParam: string;
    processStatus: string;
    processReturn: string;
};