//packages
import { Module } from '@nestjs/common';

//controllers
import { SetupController } from './setup.controller';
//services
import { SetupService } from './setup.service';

@Module({
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { }
