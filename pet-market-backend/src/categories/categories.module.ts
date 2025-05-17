import { Module } from "@nestjs/common";
import { CategoriesService } from "./services/categories.service";
import { CategoriesController } from "./categories.controller";
import { KennelCategoriesSchema } from "./schemas/kennel-categories.schema";
import { KennelCategoriesService } from "./services/kennel-categories.service";
import { TypegooseModule } from "nestjs-typegoose";
import { CategoriesSchema } from "./schemas/categories.schema";

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: KennelCategoriesSchema,
                schemaOptions: {
                    collection: "KennelCategories",
                },
            },
            {
                typegooseClass: CategoriesSchema,
                schemaOptions: { collection: "Categories" },
            },
        ]),
    ],
    exports: [KennelCategoriesService, CategoriesService],
    providers: [CategoriesService, KennelCategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
