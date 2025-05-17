import { Injectable, BadRequestException, Type } from "@nestjs/common";
import { KennelsSchema } from "./kennels.schema";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";
import { KennelStatusEnum } from "src/common/types/kennel-status";
import { UsersService } from "../users/users.service";
import { UserRole } from "src/common/types/roles.enum";
import { Errors } from "src/common/constants/errors";
import { ReviewKennelDto } from "./dto/review-kennel.dto";
import { SupportInfoDto } from "./dto/add.support.info.dto";

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
            throw new BadRequestException(Errors.YOU_ALREADY_IN_KENNEL);
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

    async rejectKennel(id: Types.ObjectId, dto: ReviewKennelDto) {
        return await this.kennelsSchema.findByIdAndUpdate(
            id,
            {
                status: KennelStatusEnum.REJECTED,
                adminMessage: dto.adminMessage,
            },
            { new: true },
        );
    }

    async disableKennel(id: Types.ObjectId, dto: ReviewKennelDto) {
        return this.kennelsSchema.findByIdAndUpdate(
            id,
            {
                status: KennelStatusEnum.DISABLED,
                adminMessage: dto.adminMessage,
            },
            { new: true },
        );
    }

    async getApprovedKennels() {
        return this.kennelsSchema.find({
            status: KennelStatusEnum.APPROVED,
        });
    }

    async getUnapprovedKennels() {
        return this.kennelsSchema.find({
            status: KennelStatusEnum.PENDING,
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

    async inviteUser(userId: Types.ObjectId, kennelId: Types.ObjectId) {
        const user = await this.usersService.getUserById(userId);
        if (user.role == UserRole.ADMIN)
            throw new BadRequestException(Errors.USER_IS_ADMIN);
        if (user.kennel)
            throw new BadRequestException(Errors.USER_ALREADY_IN_KENNEL);
        await this.usersService.setKennelId(kennelId, userId);
        await this.usersService.setUserRole(userId, UserRole.SELLER);
    }

    async SetSupportInfo(kennelId: Types.ObjectId, dto: SupportInfoDto) {
        return this.kennelsSchema.findByIdAndUpdate(
            kennelId,
            {
                supportInfo: { ...dto },
            },
            { new: true },
        );
    }
}
