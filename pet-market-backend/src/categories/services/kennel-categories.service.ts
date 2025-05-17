import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { KennelCategoriesSchema } from "../schemas/kennel-categories.schema";
import { CategoriesService } from "./categories.service";
import { Types } from "mongoose";
import { CreateCustomCategoryDto } from "../dto/create.custom-category.dto";
import { Errors } from "../../common/constants/errors";

@Injectable()
export class KennelCategoriesService {
    constructor(
        @InjectModel(KennelCategoriesSchema)
        private readonly kennelCategoriesSchema: ReturnModelType<
            typeof KennelCategoriesSchema
        >,
        private readonly categoriesService: CategoriesService,
    ) {}

    async initKennelCategories(kennelId: Types.ObjectId) {
        const systems = await this.categoriesService.getSystemCategories();
        const categoryIds = systems.map((c) => c._id);
        return await new this.kennelCategoriesSchema({
            kennelId,
            categoryIds,
        }).save();
    }

    async restoreSystemCategory(
        categoryId: Types.ObjectId,
        kennelId: Types.ObjectId,
    ) {
        const isSystem = this.categoriesService.isSystemCategory(categoryId);
        if (isSystem)
            await this.kennelCategoriesSchema.findOneAndUpdate(
                { kennelId: kennelId },
                { $push: { categoryIds: categoryId } },
                { new: true },
            );
        else {
            throw new ForbiddenException(Errors.NOT_SYSTEM_CATEGORY);
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
        const isSystem = this.categoriesService.isSystemCategory(categoryId);
        if (!isSystem)
            await this.categoriesService.deleteCustomCategory(
                kennelId,
                categoryId,
            );
        await this.kennelCategoriesSchema.findOneAndUpdate(
            { kennelId: kennelId },
            { $pull: { categoryIds: categoryId } },
            { new: true },
        );
    }

    async getCategoriesByKennel(kennelId: Types.ObjectId) {
        return this.kennelCategoriesSchema
            .findOne({
                kennelId: kennelId,
            })
            .populate("categoryIds");
    }
}
