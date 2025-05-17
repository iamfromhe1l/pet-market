import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class CategoriesSchema extends TimeStamps {
    readonly _id!: Types.ObjectId;

    @prop({ required: true, type: () => String })
    name: string;

    @prop({ type: () => [String], required: true, default: [] })
    breeds: string[];

    @prop({ type: () => Types.ObjectId })
    ownerKennelId?: Types.ObjectId;

    @prop({ required: true, type: () => Boolean, default: false })
    isSystem: boolean;
}
