import { Injectable, BadRequestException } from "@nestjs/common";
import { KennelsSchema } from "./kennels.schema";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";
import { KennelStatusEnum } from "src/common/types/kennel-status";
import { UsersService } from "../users/users.service";
import { UserRole } from "src/common/types/roles.enum";
import { promises } from "dns";

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
        await this.usersService.setKennelId(newKennel.id, userId);
        await this.usersService.setUserRole(userId, UserRole.SELLER);
        console.log(user);
        return newKennel.save();
    }

    async getAllKennels() {
        return this.kennelsSchema.find();
    }

    async approveKennel(id: Types.ObjectId) {
        return this.kennelsSchema.findByIdAndUpdate(
            id,
            { status: KennelStatusEnum.APPROVED },
            { new: true },
        );
    }

    async getAppliedKennels() {
        return this.kennelsSchema.find({
            status: KennelStatusEnum.APPROVED,
        });
    }

    async leaveKennel(userId: Types.ObjectId) {
        this.usersService.unsetKennelId(userId);
        this.usersService.setUserRole(userId, UserRole.USER);
    }

    async deleteKennel(kennelId: Types.ObjectId) {
        await this.usersService.deleteKennelFromUsers(kennelId);
        await this.kennelsSchema.findByIdAndDelete(kennelId);
    }

    async getKennelById(kennelId: Types.ObjectId): Promise<KennelsSchema> {
        return this.kennelsSchema.findById(kennelId);
    }
    //отклонение запросов на подтверждение питомника.
}
