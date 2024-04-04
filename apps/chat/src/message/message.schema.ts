import { AbstractDocument } from "@app/common";
import { Prop } from "@nestjs/mongoose";

export class MessageDocument extends AbstractDocument {
    @Prop()
    roomId:string

    @Prop()
    ownerId:string

    @Prop()
    body:string

    @Prop()
    createdAt: Date
}