//packages
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

//dtos
import { ControllerBasicDto } from "src/basics/dtos/config.dto";

export class SetupControllerConfigDto extends ControllerBasicDto {
    readRoute: string;
    postgresConnectTestRoute: string;
    mongoConnectTestRoute: string;
    saveRoute: string;
};

export class LoginDto {
    @ApiProperty()
    account: string;
    @ApiProperty()
    password: string;
};

class ConnectionDto extends LoginDto {
    @ApiProperty()
    IP: string;
    @ApiProperty()
    port: string;
};

export class RMQConnectionDto extends ConnectionDto {
    @ApiProperty()
    inputQueueName: string;
    @ApiProperty()
    outputQueueName: string;
};

export class DBConnectionDto extends ConnectionDto {
    @ApiProperty()
    DBName: string;
};

export class SetupSaveDto {
    @ApiPropertyOptional()
    enableMiddleService: boolean;
    @ApiPropertyOptional()
    bossQueue: RMQConnectionDto;
    @ApiPropertyOptional()
    jobQueue: RMQConnectionDto;
    @ApiPropertyOptional()
    admin: LoginDto;
    @ApiPropertyOptional()
    postgreSQL: DBConnectionDto;
    @ApiPropertyOptional()
    mongoDB: DBConnectionDto;
};