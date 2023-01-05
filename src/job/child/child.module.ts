//packages
import { Module } from '@nestjs/common';

//models
//services
import { ChildService } from './child.service';

@Module({
    imports: [],
    providers: [ChildService],
    exports: [ChildService]
})
export class ChildModule { };