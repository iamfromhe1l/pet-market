import { Injectable } from "@nestjs/common";
import { KennelsSchema } from "./kennels.schema";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";
import { KennelStatusEnum } from "src/common/types/kennel-status";

@Injectable()
export class KennelsService {
    constructor(
        @InjectModel(KennelsSchema)
        private readonly kennelsSchema: ReturnModelType<typeof KennelsSchema>,
    ) {}

    async createKennel(dto: CreateKennelDto) {
        const newKennel = new this.kennelsSchema({
            name: dto.name,
            address: dto.address,
            description: dto.description,
        });
        return await newKennel.save();
    }

    async getAllKennels() {
        return this.kennelsSchema.find();
    }

    async approveKennel(id: Types.ObjectId) {
        return await this.kennelsSchema.findByIdAndUpdate(
            id,
            { status: KennelStatusEnum.APPROVED },
            { new: true },
        );
    }

    async getAppliedKennels() {
        return await this.kennelsSchema.find({
            status: KennelStatusEnum.APPROVED,
        });
    }
    //отклонение запросов на подтверждение питомника.
}
