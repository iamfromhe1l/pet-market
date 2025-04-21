import { Injectable, BadRequestException } from "@nestjs/common";
import { KennelsSchema } from "./kennels.schema";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";
import { KennelStatusEnum } from "src/common/types/kennel-status";
import { UsersService } from "../users/users.service";

@Injectable()
export class KennelsService {
    constructor(
        @InjectModel(KennelsSchema)
        private readonly kennelsSchema: ReturnModelType<typeof KennelsSchema>,
        private readonly usersService: UsersService,
    ) {}

    async createKennel(dto: CreateKennelDto, userId: Types.ObjectId) {
        const user = await this.usersService.getUserById(userId);
        console.log(user);
        if (user.kennel) {
            throw new BadRequestException("У вас уже есть заявленный кеннел");
        }
        const newKennel = new this.kennelsSchema({
            name: dto.name,
            address: dto.address,
            description: dto.description,
            status: KennelStatusEnum.PENDING,
        });
        this.usersService.setKennelId(newKennel.id, userId);
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

    async leaveKennel(userId: Types.ObjectId) {
        this.usersService.unsetKennelId(userId);
    }
    //отклонение запросов на подтверждение питомника.
}
