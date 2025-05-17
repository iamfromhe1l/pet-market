import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { prop, Ref } from "@typegoose/typegoose";
import { CategoriesSchema } from "./categories.schema";

export class KennelCategoriesSchema extends TimeStamps {
    readonly _id!: Types.ObjectId;

    @prop({ required: true, type: () => Types.ObjectId })
    kennelId: Types.ObjectId;

    @prop({
        ref: () => CategoriesSchema,
        type: () => [Types.ObjectId],
        default: [],
    })
    categoryIds: Ref<CategoriesSchema>[];
}
