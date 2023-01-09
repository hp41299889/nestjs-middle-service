//dtos
import { AuthControllerConfigDto } from "./auth.dto";

const config: AuthControllerConfigDto = {
    prefix: process.env.SERVICE_AUTH_CONTROLLER_PREFIX || 'Auth',
    viewRoute: process.env.SERVICE_AUTH_CONTROLLER_VIEW_ROUTE || 'view',
    loginRoute: process.env.SERVICE_AUTH_CONTROLLER_LOGIN_ROUTE || 'login',
    logoutRoute: process.env.SERVICE_AUTH_CONTROLLER_LOGOUT_ROUTE || 'logout'
};
export default config;