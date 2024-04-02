import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class RoomDocument extends AbstractDocument {
  @Prop()
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(RoomDocument);
