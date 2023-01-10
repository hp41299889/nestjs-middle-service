//packages
import { Module } from '@nestjs/common';

//modules
import { HttpResponseModule } from 'src/utils/httpResponse/httpResponse.module';
import { SetupJsonModule } from 'src/utils/setupJson/setupJson.module';
//controllers
import { SetupController } from './setup.controller';
//services
import { SetupService } from './setup.service';

@Module({
  imports: [
    HttpResponseModule,
    SetupJsonModule
  ],
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { };