import { Module } from "@nestjs/common";
import { KennelsService } from "./kennels.service";
import { KennelsController } from "./kennels.controller";
import { UsersModule } from "src/users/users.module";
import { TypegooseModule } from "nestjs-typegoose";
import { KennelsSchema } from "./kennels.schema";

@Module({
    providers: [KennelsService],
    controllers: [KennelsController],
    imports: [
        UsersModule,
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
