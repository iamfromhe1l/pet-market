import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { KennelStatusEnum } from "src/common/types/kennel-status";

export class KennelsSchema extends TimeStamps {
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
}
