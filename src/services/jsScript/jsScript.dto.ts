import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
    @ApiProperty()
    scriptName: string;
    @ApiPropertyOptional()
    scriptContent: string;
    @ApiPropertyOptional()
    scriptPackage?: object;
    scriptSource?: string;
};

export class UpdateOneJSScriptByIDDto {
    @ApiProperty()
    scriptID: number;
    @ApiPropertyOptional()
    scriptName?: string;
    @ApiPropertyOptional()
    scriptContent?: string;
    @ApiPropertyOptional()
    scriptPackage?: object;
};

export class ReadOneJSScriptByIDDto {
    @ApiProperty()
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