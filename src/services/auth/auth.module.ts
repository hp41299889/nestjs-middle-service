//packages
import { Module } from '@nestjs/common';

//controllers
import { AuthController } from './auth.controller';
//services
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { };