import { Module } from "@nestjs/common";
import { KennelsService } from "./kennels.service";
import { KennelsController } from "./kennels.controller";
import { UsersModule } from "src/users/users.module";
import { TypegooseModule } from "nestjs-typegoose";
import { KennelsSchema } from "./kennels.schema";
import { KennelCategoriesSchema } from "src/categories/schemas/kennel-categories.schema";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
    providers: [KennelsService],
    controllers: [KennelsController],
    imports: [
        UsersModule,
        CategoriesModule,
        TypegooseModule.forFeature([
            {
                typegooseClass: KennelsSchema,
                schemaOptions: {
                    collection: "Kennels",
                },
            },
        ]),
    ],
})
export class KennelsModule {}
