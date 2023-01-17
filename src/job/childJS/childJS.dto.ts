//packages
import { ApiPropertyOptional } from "@nestjs/swagger";

export class JSFileDto {
    scriptID?: number;
    scriptVersion?: number;
};

export class ChildJSDto extends JSFileDto {
    @ApiPropertyOptional()
    input?: object;
};