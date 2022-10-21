import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
    rmqUsername: process.env.RABBITMQ_USERNAME,
    rmqPassword: process.env.RABBITMQ_PASSWORD,
    rmqHost: process.env.RABBITMQ_HOST,
    rmqQueueName: process.env.RABBITMQ_QUEUE_NAME
}));