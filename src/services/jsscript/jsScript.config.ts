//dtos
import { JSScriptControllerConfigDto } from "./jsScript.dto";

const config: JSScriptControllerConfigDto = {
    prefix: process.env.SERVICE_JSSCRIPT_CONTROLLER_PREFIX || 'JSScript',
    viewRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_VIEW_ROUTE || 'view',
    createRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_CREATE_ROUTE || 'create',
    readAllRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_READALL_ROUTE || 'readAll',
    queryRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_QUERY_ROUTE || 'query',
    updateRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_UPDATE_ROUTE || 'update',
    deleteRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_DELETE_ROUTE || 'delete',
    testRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_TEST_ROUTE || 'test',
};
export default config;