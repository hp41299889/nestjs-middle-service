//packages
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class JSFileDto {
    @ApiProperty()
    scriptID?: number;
    @ApiProperty()
    scriptVersion?: number;
};

export class ChildJSDto extends JSFileDto {
    @ApiPropertyOptional()
    input?: object;
};