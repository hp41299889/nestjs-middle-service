//packages
import { Module } from '@nestjs/common';

//services
import { ChildService } from './child.service';

@Module({
    providers: [ChildService],
    exports: [ChildService]
})
export class ChildModule { };