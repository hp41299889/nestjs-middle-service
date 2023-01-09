//dtos
import { SetupControllerConfigDto } from "./setup.dto";

const config: SetupControllerConfigDto = {
    prefix: process.env.SERVICE_SETUP_CONTROLLER_PREFIX || 'Setup',
    viewRoute: process.env.SERVICE_SETUP_CONTROLLER_VIEW_ROUTE || 'view',
    readRoute: process.env.SERVICE_SETUP_CONTROLLER_READ_ROUTE || 'read',
    postgresConnectTestRoute: process.env.SERVICE_SETUP_CONTROLLER_POSTGRESCONNECTTEST_ROUTE || 'postgresConnectTest',
    mongoConnectTestRoute: process.env.SERVICE_SETUP_CONTROLLER_MONGOCONNECTTEST_ROUTE || 'mongoConnectTest',
    saveRoute: process.env.SERVICE_SETUP_CONTROLLER_SAVE_ROUTE || 'save'
};
export default config;