import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { UserRole } from "../common/types/roles.enum";
import { PaymentEnum } from "../common/types/payment.enum";

class OrderInfo {
    @prop({ required: true, type: () => String })
    fullName: string;

    @prop({ required: true, type: () => String })
    address: string;

    @prop({ required: true, type: () => String })
    phone: string;

    @prop({ required: true, enum: UserRole })
    paymentMethod: PaymentEnum;
}

export class UsersSchema extends TimeStamps {
    readonly _id!: Types.ObjectId;

    @prop({ unique: true, required: true, type: () => String })
    email: string;

    @prop({ type: () => String })
    username?: string;

    @prop({ required: true, type: () => String })
    hash: string;

    @prop({ default: null, nullable: true })
    rtHash?: string | null;

    // @prop({ type: () => Types.ObjectId }) use Ref arbuz like in CategoriesSchema
    // kennel?: Types.ObjectId; here too

    @prop({ required: true, enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @prop({ type: () => OrderInfo, _id: false })
    orderInfo?: OrderInfo[];
}
