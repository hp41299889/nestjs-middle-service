//packages
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JSExecutionLogDocument = HydratedDocument<JSExecutionLog>;

@Schema()
export class JSExecutionLog {
    @Prop()
    logID: string;

    @Prop()
    scriptID: number;

    @Prop()
    scriptName: string;

    @Prop()
    scriptVersion: number;

    @Prop()
    processDatetime: Date;

    @Prop()
    processParam: string;

    @Prop()
    processStatus: string;

    @Prop()
    processReturn: string;
}

export const JSExecutionLogSchema = SchemaFactory.createForClass(JSExecutionLog);