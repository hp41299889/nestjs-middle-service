//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

enum dateIntervalEnum {
    '前一日' = 'day',
    '前一週' = 'week',
    '前一月' = 'month',
    '前一年' = 'year'
};

export class JSExecutionLogControllerConfigDto extends ControllerBasicDto {
    queryRoute: string;
};

export class QueryJSExecutionLogDto {
    startDate: string;
    dateInterval: 'day' | 'week' | 'month' | 'year';
};