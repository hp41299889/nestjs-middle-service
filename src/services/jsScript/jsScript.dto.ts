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
    scriptSource?: string;
};

export class UpdateOneJSScriptByIDDto {
    scriptID: number;
    scriptName?: string;
    scriptContent?: string;
    scriptPackage?: object;
};

export class ReadOneJSScriptByIDDto {
    scriptID: number;
};

export class DeleteOneJSScriptByIDDto extends ReadOneJSScriptByIDDto {

};

export class PreDto {
    scriptID?: number;
    scriptName?: string;
    scriptContent?: string;
    scriptPackage?: object;
};