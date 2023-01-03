import { registerAs } from '@nestjs/config';

export default registerAs('postgre', () => ({
    postgreUsername: process.env.POSTGRE_USERNAME,
    postgrePassword: process.env.POSTGRE_PASSWORD,
    postgreHost: process.env.POSTGRE_HOST,
    postgrePost: process.env.POSTGRE_PORT,
    postgreDatabase: process.env.POSTGRE_DATABASE
}));