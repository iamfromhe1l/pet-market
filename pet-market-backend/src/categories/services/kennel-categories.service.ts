import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { KennelCategoriesSchema } from "../schemas/kennel-categories.schema";
import { CategoriesService } from "./categories.service";
import { Types } from "mongoose";
import { CreateCustomCategoryDto } from "../dto/create.custom-category.dto";
import { PetsService } from "../../pets/pets.service";

@Injectable()
export class KennelCategoriesService {
    constructor(
        @InjectModel(KennelCategoriesSchema)
        private readonly kennelCategoriesSchema: ReturnModelType<
            typeof KennelCategoriesSchema
        >,
        private readonly categoriesService: CategoriesService,
        private readonly petsService: PetsService,
    ) {}

    async initKennelCategories(kennelId: Types.ObjectId) {
        const systems = await this.categoriesService.getSystemCategories();
        const categoryIds = systems.map((c) => c._id);
        return await new this.kennelCategoriesSchema({
            kennelId,
            categoryIds,
        }).save();
    }

    async restoreCategory(
        categoryId: Types.ObjectId,
        kennelId: Types.ObjectId,
    ) {
        const isSystem =
            await this.categoriesService.isSystemCategory(categoryId);
        if (isSystem)
            await this.kennelCategoriesSchema.findOneAndUpdate(
                { kennelId: kennelId },
                { $push: { categoryIds: categoryId } },
                { new: true },
            );
        else {
            await this.categoriesService.enableCategory(categoryId, kennelId);
            await this.petsService.enablePets(categoryId);
        }
    }

    async createCategory(
        kennelId: Types.ObjectId,
        dto: CreateCustomCategoryDto,
    ) {
        const category = await this.categoriesService.createCustomCategory(
            kennelId,
            dto,
        );
        await this.kennelCategoriesSchema.findOneAndUpdate(
            { kennelId: kennelId },
            { $push: { categoryIds: category._id } },
            { new: true },
        );
    }

    async removeCategory(categoryId: Types.ObjectId, kennelId: Types.ObjectId) {
        const isSystem =
            await this.categoriesService.isSystemCategory(categoryId);
        console.log("1", isSystem);
        if (isSystem)
            await this.kennelCategoriesSchema.findOneAndUpdate(
                { kennelId: kennelId },
                { $pull: { categoryIds: categoryId } },
                { new: true },
            );
        else await this.categoriesService.disableCategory(categoryId, kennelId);
        await this.petsService.disablePets(categoryId);
    }

    async getCategoriesByKennel(kennelId: Types.ObjectId) {
        return this.kennelCategoriesSchema
            .findOne({
                kennelId: kennelId,
            })
            .populate("categoryIds");
    }
}
