import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { CategoriesSchema } from "../schemas/categories.schema";
import { CreateCustomCategoryDto } from "../dto/create.custom-category.dto";
import { Types } from "mongoose";
import { Errors } from "../../common/constants/errors";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(CategoriesSchema)
        private readonly categoriesSchema: ReturnModelType<
            typeof CategoriesSchema
        >,
    ) {}

    async createCustomCategory(
        kennelId: Types.ObjectId,
        dto: CreateCustomCategoryDto,
    ): Promise<CategoriesSchema> {
        return await new this.categoriesSchema({
            name: dto.name,
            breeds: dto.breeds,
            ownerKennelId: kennelId,
            isSystem: false,
        }).save();
    }

    async deleteCustomCategory(
        kennelId: Types.ObjectId,
        categoryId: Types.ObjectId,
    ) {
        await this.getCustomCategory(kennelId, categoryId);
        await this.categoriesSchema.findByIdAndDelete(categoryId);
    }

    async updateCustomCategory(
        kennelId: Types.ObjectId,
        categoryId: Types.ObjectId,
        dto: CreateCustomCategoryDto,
    ) {
        const category = await this.getCustomCategory(kennelId, categoryId);
        category.name = dto.name;
        category.breeds = dto.breeds;
        return category.save();
    }

    async getCustomCategory(
        kennelId: Types.ObjectId,
        categoryId: Types.ObjectId,
    ): Promise<DocumentType<CategoriesSchema>> {
        const category = await this.getCategory(categoryId);
        if (category.isSystem)
            throw new ForbiddenException(Errors.CANT_CHANGE_SYSTEM_CATEGORY);
        if (category.ownerKennelId != kennelId)
            throw new ForbiddenException(Errors.MISMATCH_CATEGORIES_ID);
        return category;
    }

    async getCategory(
        categoryId: Types.ObjectId,
    ): Promise<DocumentType<CategoriesSchema>> {
        const category = this.categoriesSchema.findById(categoryId).exec();
        if (!category) throw new NotFoundException(Errors.CATEGORY_NOT_EXIST);
        return category;
    }

    async getSystemCategories(): Promise<CategoriesSchema[]> {
        return this.categoriesSchema.find({ isSystem: true });
    }

    async createCategory() {
        throw new Error("nut implemented");
        // method for admins, to add system categories
    }

    async deleteCategory() {
        throw new Error("nut implemented");
        // method for admins, to add system categories
    }
}
