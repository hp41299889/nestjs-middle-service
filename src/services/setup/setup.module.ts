//packages
import { Module } from '@nestjs/common';
import { SetupJsonModule } from 'src/utils/setupJson/setupJson.module';

//controllers
import { SetupController } from './setup.controller';
//services
import { SetupService } from './setup.service';

@Module({
  imports: [SetupJsonModule],
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { };