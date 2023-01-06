export class CreateOneJSScriptDto {
    scriptName: string;
    scriptContent: string;
    scriptPackage?: object;
};

export class UpdateOneJSScriptByIDDto {
    scriptID: number;
    scriptName?: string;
    scriptContent?: string;
};

export class ReadOneJSScriptByIDDto {
    scriptID: number;
};

export class DeleteOneJSScriptByIDDto extends ReadOneJSScriptByIDDto {

};

export class TestDto {
    scriptID: number;
    input: object;
};