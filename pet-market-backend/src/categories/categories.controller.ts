import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { Roles } from "../common/decorators/role.decorator";
import { UserRole } from "../common/types/roles.enum";
import { ParseObjectIdPipe } from "../common/pipes/parse_object_id.pipe";
import { Types } from "mongoose";
import { KennelCategoriesService } from "./services/kennel-categories.service";
import { CategoriesService } from "./services/categories.service";
import { GetCurrentKennelId } from "../common/decorators/get_current_kennel_id.decorator";
import { CreateCustomCategoryDto } from "./dto/create.custom-category.dto";

@Controller("categories")
export class CategoriesController {
    constructor(
        private readonly kennelCategoriesService: KennelCategoriesService,
        private readonly categoriesService: CategoriesService,
    ) {}

    @Get("system")
    async getSystemCategories() {
        return this.categoriesService.getSystemCategories();
    }

    @Get("custom/:categoryId")
    async getCategoryById(
        @Param("categoryId", ParseObjectIdPipe) categoryId: Types.ObjectId,
        @GetCurrentKennelId() kennelId: Types.ObjectId,
    ) {
        return this.categoriesService.checkAndGetCustomCategory(
            kennelId,
            categoryId,
        );
    }

    @Get()
    @Roles(UserRole.SELLER)
    async getCategoriesByKennel(
        @GetCurrentKennelId() kennelId: Types.ObjectId,
    ) {
        return this.kennelCategoriesService.getCategoriesByKennel(kennelId);
    }

    @Post()
    @Roles(UserRole.SELLER)
    async createCustomCategory(
        @GetCurrentKennelId() kennelId: Types.ObjectId,
        @Body() dto: CreateCustomCategoryDto,
    ) {
        return this.kennelCategoriesService.createCategory(kennelId, dto);
    }

    @Patch("restore/:categoryId")
    @Roles(UserRole.SELLER)
    async restoreSystemCategory(
        @GetCurrentKennelId() kennelId: Types.ObjectId,
        @Param("categoryId", ParseObjectIdPipe) categoryId: Types.ObjectId,
    ) {
        return this.kennelCategoriesService.restoreSystemCategory(
            categoryId,
            kennelId,
        );
    }

    @Patch(":categoryId")
    @Roles(UserRole.SELLER)
    async updateCustomCategory(
        @Param("categoryId", ParseObjectIdPipe) categoryId: Types.ObjectId,
        @GetCurrentKennelId() kennelId: Types.ObjectId,
        @Body() dto: CreateCustomCategoryDto,
    ) {
        return this.categoriesService.updateCustomCategory(
            kennelId,
            categoryId,
            dto,
        );
    }

    @Delete(":categoryId")
    @Roles(UserRole.SELLER)
    async removeCategory(
        @Param("categoryId", ParseObjectIdPipe) categoryId: Types.ObjectId,
        @GetCurrentKennelId() kennelId: Types.ObjectId,
    ) {
        return this.kennelCategoriesService.removeCategory(
            categoryId,
            kennelId,
        );
    }
}
