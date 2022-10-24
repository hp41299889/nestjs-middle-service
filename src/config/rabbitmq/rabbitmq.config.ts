import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
    rabbitmqUsername: process.env.RABBITMQ_USERNAME,
    rabbitmqPassword: process.env.RABBITMQ_PASSWORD,
    rabbitmqHost: process.env.RABBITMQ_HOST,
    rabbitmqQueueName: process.env.RABBITMQ_QUEUE_NAME,
}));