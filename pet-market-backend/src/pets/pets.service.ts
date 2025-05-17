import { Injectable, NotFoundException } from "@nestjs/common";
import { PetsSchema } from "./pets.schema";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CreatePetDto } from "./dto/pet.dto";
import { title } from "process";
import { Types } from "mongoose";
import { Errors } from "src/common/constants/errors";
import { SearchPetDto } from "./dto/search.pet.dto";
import { SearchResults } from "src/common/types/search.result";
import { CategoriesService } from "src/categories/services/categories.service";

@Injectable()
export class PetsService {
    constructor(
        @InjectModel(PetsSchema)
        private readonly petsSchema: ReturnModelType<typeof PetsSchema>,
        private readonly categoriesService: CategoriesService,
    ) {}

    async createPet(
        kennelId: Types.ObjectId,
        dto: CreatePetDto,
    ): Promise<PetsSchema> {
        await this.categoriesService.checkCategory(kennelId, dto.categoryId);
        return this.petsSchema.create({
            ...dto,
            kennel: new Types.ObjectId(kennelId),
            count: dto.count ?? 1,
            disabled: false,
        });
    }

    async getPetsByKennel(kennelId: Types.ObjectId): Promise<PetsSchema[]> {
        return this.petsSchema.find({ kennel: kennelId }).exec(); //.populate('category');//.populate("kennel")
    }

    async getPetById(id: Types.ObjectId): Promise<PetsSchema> {
        const pet = this.petsSchema.findById(id);
        if (!pet) throw new NotFoundException(Errors.PET_NOT_FOUND);
        return pet;
    }

    async updatePet(
        id: Types.ObjectId,
        dto: Partial<CreatePetDto>,
    ): Promise<PetsSchema> {
        const updated = await this.petsSchema
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();

        if (!updated) throw new NotFoundException(Errors.PET_NOT_FOUND);
        return updated;
    }

    async deletePet(id: Types.ObjectId): Promise<void> {
        const deleted = await this.petsSchema.findByIdAndDelete(id).exec();

        if (!deleted) throw new NotFoundException(Errors.PET_NOT_FOUND);
    }

    async searchPets(filter: SearchPetDto): Promise<SearchResults> {
        const query: any = {};

        if (filter.text) {
            query.$or = [
                { title: { $regex: filter.text, $options: "i" } },
                { description: { $regex: filter.text, $options: "i" } },
            ];
        }

        if (filter.sex) query.sex = filter.sex;

        if (filter.kennelId) query.kennel = filter.kennelId;

        if (filter.categoryId?.length)
            query.categoryId = { $in: filter.categoryId };

        if (filter.breed?.length) {
            query.breed = { $in: filter.breed };
        }

        if (filter.priceMin || filter.priceMax) {
            query.price = {};
            if (filter.priceMin !== undefined)
                query.price.$gte = filter.priceMin;
            if (filter.priceMax !== undefined)
                query.price.$lte = filter.priceMax;
        }

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const sortField: "price" | "title" = filter.sortBy ?? "title";
        const sortOrder = filter.order === "asc" ? 1 : -1;

        const queryBuilder = this.petsSchema
            .find(query)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);
        if (filter.populateKennel) queryBuilder.populate("kennel");
        const [items, total] = await Promise.all([
            queryBuilder.exec(),
            this.petsSchema.countDocuments(query),
        ]);

        return { items, total, page, limit };
    }
}
