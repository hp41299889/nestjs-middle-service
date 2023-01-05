class LoginDto {
    account: string;
    password: string;
};

class ConnectionDto extends LoginDto {
    IP: string;
    port: string;
};

class RMQConnectionDto extends ConnectionDto {
    inputQueueName: string;
    outputQueueName: string;
};

export class DBConnectionDto extends ConnectionDto {
    DBName: string;
};

export class SetupSaveDto {
    enableMiddleService: boolean;
    bossQueue: RMQConnectionDto
    jobQueue: RMQConnectionDto
    admin: LoginDto
    postgreSQL: DBConnectionDto
    mongoDB: DBConnectionDto
};