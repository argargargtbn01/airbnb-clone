import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class MessageDocument extends AbstractDocument {
  @Prop()
  roomId: string;

  @Prop()
  ownerId: string;

  @Prop()
  body: string;

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
