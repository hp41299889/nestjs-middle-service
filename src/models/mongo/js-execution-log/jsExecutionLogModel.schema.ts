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
    scriptVersion: number;

    @Prop()
    processDatetime: Date;

    @Prop()
    precessParam: string;

    @Prop()
    processStatus: string;

    @Prop()
    processReturn: string;
}

export const JSExecutionLogSchema = SchemaFactory.createForClass(JSExecutionLog);