//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

export class JSExecutionLogControllerConfigDto extends ControllerBasicDto {
    queryRoute: string;
};

export class QueryJSExecutionLogDto {
    startDate: string;
    dateInterval: string;
};