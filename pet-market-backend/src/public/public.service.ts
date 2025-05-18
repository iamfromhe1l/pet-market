import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { KennelsSchema } from "src/kennels/kennels.schema";
import { PetsSchema } from "src/pets/pets.schema";
import { UsersSchema } from "src/users/users.schema";

@Injectable()
export class PublicService {
    constructor(
        @InjectModel(PetsSchema) private readonly petsModel: Model<PetsSchema>,
        @InjectModel(KennelsSchema)
        private readonly kennelsModel: Model<KennelsSchema>,
        @InjectModel(UsersSchema)
        private readonly usersModel: Model<UsersSchema>,
    ) {}

    async getPlatformStats() {
        const [totalPets, totalKennels, totalUsers] = await Promise.all([
            this.petsModel.countDocuments(),
            this.kennelsModel.countDocuments(),
            this.usersModel.countDocuments(),
        ]);

        return { totalPets, totalKennels, totalUsers };
    }

    async getRecentPets(limit: number) {
        return this.petsModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
    }

    async getRandomPets(limit: number): Promise<PetsSchema[]> {
        const safeLimit = Math.min(limit || 3, 20);
        return this.petsModel.aggregate([{ $sample: { size: safeLimit } }]);
    }
}
