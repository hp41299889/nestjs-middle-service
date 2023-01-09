//packages
import { Module } from '@nestjs/common';

//modules
import { SetupJsonModule } from 'src/utils/setupJson/setupJson.module';
import { HttpResponseModule } from 'src/utils/httpResponse/httpResponse.module';
//controllers
import { AuthController } from './auth.controller';
//services
import { AuthService } from './auth.service';

@Module({
    imports: [
        HttpResponseModule,
        SetupJsonModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { };