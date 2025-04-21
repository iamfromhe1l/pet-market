import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { UsersSchema } from "./users.schema";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateUserDto } from "./dto/create.user.dto";
import { Types } from "mongoose";
import { Errors } from "../common/constants/errors";
import { UserRole } from "../common/types/roles.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UsersSchema)
        private readonly usersSchema: ReturnModelType<typeof UsersSchema>,
    ) {}

    async createUser(dto: CreateUserDto): Promise<UsersSchema> {
        return await new this.usersSchema({
            email: dto.email,
            hash: dto.hash,
            username: dto.username,
        }).save();
    }

    async getUserWithHash(email: string): Promise<UsersSchema> {
        return this.usersSchema.findOne({ email }).exec();
    }

    async getUser(email: string) {
        const user = await this.getUserWithHash(email);
        if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);
        return {
            email: user.email,
            username: user.username,
            _id: user._id,
            role: user.role,
        };
    }

    async getUserById(id: Types.ObjectId): Promise<UsersSchema> {
        const user = this.usersSchema.findById(id).exec();
        if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND);
        return user;
    }

    async getUserId(email: string): Promise<Types.ObjectId> {
        const user = await this.usersSchema.findOne({ email }).exec();
        return user ? user._id : null;
    }

    async updateRtHash(id: Types.ObjectId, hash: string): Promise<void> {
        await this.usersSchema.findByIdAndUpdate(id, { rtHash: hash });
    }

    async setUserRole(id: Types.ObjectId, role: UserRole): Promise<void> {
        this.usersSchema.findByIdAndUpdate(id, { $set: { role } });
    }

    async addAdmin(id: Types.ObjectId): Promise<void> {
        await this.setUserRole(id, UserRole.ADMIN);
    }

    async removeAdmin(id: Types.ObjectId): Promise<void> {
        await this.setUserRole(id, UserRole.USER);
    }
}
