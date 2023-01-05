//packages
import { Module } from '@nestjs/common';

//modules
import { SetupJsonModule } from 'src/utils/setupJson/setupJson.module';
//controllers
import { AuthController } from './auth.controller';
//services
import { AuthService } from './auth.service';

@Module({
    imports: [SetupJsonModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { };