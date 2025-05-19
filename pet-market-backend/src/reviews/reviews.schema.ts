import { prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { KennelsSchema } from "src/kennels/kennels.schema";
import { PetsSchema } from "src/pets/pets.schema";
import { UsersSchema } from "src/users/users.schema";

export class ReviewsSchema extends TimeStamps {
    readonly _id!: Types.ObjectId;

    @prop({ required: true, ref: () => UsersSchema })
    userId: Ref<UsersSchema>;

    @prop({ required: true, ref: () => KennelsSchema })
    kennelId: Ref<KennelsSchema>;

    @prop({ required: true, ref: () => PetsSchema })
    petId: Ref<PetsSchema>;

    @prop({ required: true, type: () => String })
    comment: string;

    @prop({ type: () => String, default: null })
    reply?: string | null;

    @prop({ required: true, type: () => Number, min: 1, max: 5 })
    rating: number;
}
