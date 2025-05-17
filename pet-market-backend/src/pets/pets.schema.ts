import { prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { CategoriesSchema } from "src/categories/schemas/categories.schema";
import { SexEnum } from "src/common/types/sex.enum";
import { KennelsSchema } from "src/kennels/kennels.schema";

export class PetsSchema extends TimeStamps {
    readonly _id!: Types.ObjectId;

    @prop({ required: true, type: () => String })
    title: string;

    @prop({ required: true, type: () => Date })
    birthDate: Date;

    @prop({ required: true, ref: () => CategoriesSchema })
    categoryId: Ref<CategoriesSchema>;

    @prop({ required: false, type: () => String })
    breed?: string;

    @prop({ required: true, enum: SexEnum })
    sex: SexEnum;

    @prop({ type: () => Number })
    price: number;

    @prop({ required: true, ref: () => KennelsSchema })
    kennel: Ref<KennelsSchema>;

    @prop({ type: () => String })
    description: string;

    @prop({ default: 1 })
    count: number;

    @prop({ default: false })
    disabled: boolean;
}

//закоментированы поля, которые ссылаются на модули, которых у меня пока в данной ветке нет
