import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    appEnv: process.env.APP_ENV,
    appName: process.env.APP_NAME,
    appPrefix: process.env.APP_PREFIX,
    appPort: process.env.APP_PORT,
    appServices: process.env.APP_SERVICE_OPTIONS
}));