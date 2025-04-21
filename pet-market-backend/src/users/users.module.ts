import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { UsersSchema } from "./users.schema";

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: UsersSchema,
                schemaOptions: {
                    collection: "Users",
                },
            },
        ]),
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
