//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

export class SetupControllerConfigDto extends ControllerBasicDto {
    readRoute: string;
    postgresConnectTestRoute: string;
    mongoConnectTestRoute: string;
    saveRoute: string;
};

export class LoginDto {
    account: string;
    password: string;
};

class ConnectionDto extends LoginDto {
    IP: string;
    port: string;
};

export class RMQConnectionDto extends ConnectionDto {
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