import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
    mongoUsername: process.env.MONGO_USERNAME,
    mongoPassword: process.env.MONGO_PASSWORD,
    mongoHost: process.env.MONGO_HOST,
    mongoDatabase: process.env.MONGO_DATABASE,
}));