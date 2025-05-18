import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { PublicService } from "./public.service";
import { TypegooseModule } from "nestjs-typegoose";
import { PetsSchema } from "src/pets/pets.schema";
import { KennelsSchema } from "src/kennels/kennels.schema";
import { UsersSchema } from "src/users/users.schema";
import { PetsModule } from "src/pets/pets.module";
import { UsersModule } from "src/users/users.module";
import { KennelsModule } from "src/kennels/kennels.module";

@Module({
    imports: [
        PetsModule,
        UsersModule,
        KennelsModule,
        TypegooseModule.forFeature([
            {
                typegooseClass: PetsSchema,
                schemaOptions: { collection: "pets" },
            },
            {
                typegooseClass: KennelsSchema,
                schemaOptions: { collection: "kennels" },
            },
            {
                typegooseClass: UsersSchema,
                schemaOptions: { collection: "users" },
            },
        ]),
    ],
    controllers: [PublicController],
    providers: [PublicService],
})
export class PublicModule {}
