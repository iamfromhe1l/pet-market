import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { KennelStatusEnum } from "src/common/types/kennel-status";

class SupportInfo {
    @prop({ type: () => String })
    phone: string;

    @prop({ type: () => String })
    telegramHandle: string;
}

export class KennelsSchema extends TimeStamps {
    readonly _id: Types.ObjectId;

    @prop({ type: () => String })
    name: string;

    @prop({ type: () => String })
    address: string;

    @prop({ type: () => String })
    description: string;

    @prop({
        required: true,
        enum: KennelStatusEnum,
        default: KennelStatusEnum.PENDING,
    })
    status: KennelStatusEnum;

    @prop({ type: () => String })
    adminMessage?: string;

    @prop({ type: () => SupportInfo, _id: false })
    supportInfo?: SupportInfo;
}
