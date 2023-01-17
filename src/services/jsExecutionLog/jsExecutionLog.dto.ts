//packages
import { ApiProperty } from "@nestjs/swagger";

//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

export class JSExecutionLogControllerConfigDto extends ControllerBasicDto {
    queryRoute: string;
};

export class QueryJSExecutionLogDto {
    @ApiProperty()
    startDate: string;
    @ApiProperty()
    dateInterval: 'day' | 'week' | 'month' | 'year';
};