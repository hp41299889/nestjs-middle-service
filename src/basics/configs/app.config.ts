//packages
import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    name: process.env.APP_NAME || 'LNT_MiddleService',
    port: process.env.APP_PORT || 3000,
    prefix: process.env.APP_PREFIX || 'MiddleService',
    sessionKey: process.env.APP_SESSION_KEY || 'lnt',
    sessionLife: process.env.APP_SESSION_LIFE || 1800000,
}));