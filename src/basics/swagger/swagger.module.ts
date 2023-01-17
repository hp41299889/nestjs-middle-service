//import packages
import { Module } from '@nestjs/common';

//import services
import { SwaggerService } from './swagger.service';

@Module({
  providers: [SwaggerService],
})
export class SwaggerModule { }
