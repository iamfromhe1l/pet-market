import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { ReviewsSchema } from "./reviews.schema";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: ReviewsSchema,
                schemaOptions: { collection: "Reviews", timestamps: true },
            },
        ]),
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}
