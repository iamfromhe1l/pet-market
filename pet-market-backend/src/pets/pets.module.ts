import { forwardRef, Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { PetsController } from "./pets.controller";
import { PetsService } from "./pets.service";
import { PetsSchema } from "./pets.schema";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: PetsSchema,
                schemaOptions: { collection: "Pets" },
            },
        ]),
        forwardRef(() => CategoriesModule),
    ],
    controllers: [PetsController],
    providers: [PetsService],
    exports: [PetsService],
})
export class PetsModule {}
