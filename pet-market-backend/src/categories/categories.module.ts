import { Module } from "@nestjs/common";
import { CategoriesService } from "./services/categories.service";
import { CategoriesController } from "./categories.controller";

@Module({
    providers: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule {}
