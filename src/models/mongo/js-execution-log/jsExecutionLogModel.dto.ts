export class CreateJSExecutionLogDto {
    scriptID: number;
    scriptVersion: number;
    processDatetime: Date;
    precessParam: string;
    processStatus: string;
    processReturn: string;
};