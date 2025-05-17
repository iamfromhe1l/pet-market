import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { CategoriesSchema } from "../schemas/categories.schema";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(CategoriesSchema)
        private readonly categoriesSchema: ReturnModelType<
            typeof CategoriesSchema
        >,
    ) {}

    async createCustomCategory() {}
    async deleteCustomCategory() {}
    async addCategory() {}
    async removeCategory() {}

    async createCategory() {
        throw new Error("nut implemented");
        // method for admins, to add system categories
    }

    async deleteCategory() {
        throw new Error("nut implemented");
        // method for admins, to add system categories
    }
}
