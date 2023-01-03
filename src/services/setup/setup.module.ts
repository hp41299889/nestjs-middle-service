import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';

@Module({
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule {}
