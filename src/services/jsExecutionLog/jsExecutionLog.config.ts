//dtos
import { JSExecutionLogControllerConfigDto } from "./jsExecutionLog.dto";

const config: JSExecutionLogControllerConfigDto = {
    prefix: process.env.SERVICE_JSEXECUTIONLOG_CONTROLLER_PREFIX || 'JSExecutionLog',
    viewRoute: process.env.SERVICE_JSEXECUTIONLOG_CONTROLLER_VIEW_ROUTE || 'view',
    queryRoute: process.env.SERVICE_JSEXECUTIONLOG_CONTROLLER_QUERY_ROUTE || 'query',
};
export default config;