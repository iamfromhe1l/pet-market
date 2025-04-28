import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { SexEnum } from "src/common/types/sex.enum";

export class PetsSchema extends TimeStamps {
    @prop({ required: true })
    title: string;

    @prop({ required: true })
    birthDate: Date;

    // @prop({ required: true, ref: () => CategoriesSchema })
    // category: Ref<CategoriesSchema>;

    @prop({ required: true, enum: SexEnum })
    sex: SexEnum;

    @prop()
    price: number;

    // @prop({ required: true, ref: () => KennelsSchema })
    // kennel: Ref<KennelsSchema>;

    @prop()
    description: string;

    @prop({ default: 1 })
    count: number;

    @prop({ default: false })
    disabled: boolean;
}

//закоментированы поля, которые ссылаются на модули, которых у меня пока в данной ветке нет
