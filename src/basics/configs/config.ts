//packages
import * as dotenv from 'dotenv';

//dtos
import { AppConfigDto } from "../dtos/config.dto";
import { AuthControllerConfigDto } from 'src/services/auth/auth.dto';
import { JSExecutionLogControllerConfigDto } from 'src/services/jsExecutionLog/jsExecutionLog.dto';
import { JSScriptControllerConfigDto } from 'src/services/jsScript/jsScript.dto';
import { SetupControllerConfigDto } from 'src/services/setup/setup.dto';
dotenv.config();

export const appConfig: AppConfigDto = {
    name: process.env.APP_NAME || 'LNT_MiddleService',
    port: process.env.APP_PORT || 3000,
    prefix: process.env.APP_PREFIX || 'MiddleService',
    sessionKey: process.env.APP_SESSION_KEY || 'lnt',
    sessionLife: process.env.APP_SESSION_LIFE || 1800000,
};

export const authControllerConfig: AuthControllerConfigDto = {
    prefix: process.env.SERVICE_AUTH_CONTROLLER_PREFIX || 'Auth',
    viewRoute: process.env.SERVICE_AUTH_CONTROLLER_VIEW_ROUTE || 'view',
    loginRoute: process.env.SERVICE_AUTH_CONTROLLER_LOGIN_ROUTE || 'login',
    logoutRoute: process.env.SERVICE_AUTH_CONTROLLER_LOGOUT_ROUTE || 'logout'
};

export const jSExecutionLogControllerConfig: JSExecutionLogControllerConfigDto = {
    prefix: process.env.SERVICE_JSEXECUTIONLOG_CONTROLLER_PREFIX || 'JSExecutionLog',
    viewRoute: process.env.SERVICE_JSEXECUTIONLOG_CONTROLLER_VIEW_ROUTE || 'view',
    queryRoute: process.env.SERVICE_JSEXECUTIONLOG_CONTROLLER_QUERY_ROUTE || 'query',
};

export const jsScriptControllerConfig: JSScriptControllerConfigDto = {
    prefix: process.env.SERVICE_JSSCRIPT_CONTROLLER_PREFIX || 'JSScript',
    viewRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_VIEW_ROUTE || 'view',
    createRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_CREATE_ROUTE || 'create',
    readAllRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_READALL_ROUTE || 'readAll',
    queryRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_QUERY_ROUTE || 'query',
    updateRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_UPDATE_ROUTE || 'update',
    deleteRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_DELETE_ROUTE || 'delete',
    testRoute: process.env.SERVICE_JSSCRIPT_CONTROLLER_TEST_ROUTE || 'test',
};

export const setupControllerConfig: SetupControllerConfigDto = {
    prefix: process.env.SERVICE_SETUP_CONTROLLER_PREFIX || 'Setup',
    viewRoute: process.env.SERVICE_SETUP_CONTROLLER_VIEW_ROUTE || 'view',
    readRoute: process.env.SERVICE_SETUP_CONTROLLER_READ_ROUTE || 'read',
    postgresConnectTestRoute: process.env.SERVICE_SETUP_CONTROLLER_POSTGRESCONNECTTEST_ROUTE || 'postgreConnectTest',
    mongoConnectTestRoute: process.env.SERVICE_SETUP_CONTROLLER_MONGOCONNECTTEST_ROUTE || 'mongoConnectTest',
    saveRoute: process.env.SERVICE_SETUP_CONTROLLER_SAVE_ROUTE || 'save'
};