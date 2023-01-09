//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

export class JSScriptControllerConfigDto extends ControllerBasicDto {
    createRoute: string;
    readAllRoute: string;
    queryRoute: string;
    updateRoute: string;
    deleteRoute: string;
    testRoute: string;
};

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