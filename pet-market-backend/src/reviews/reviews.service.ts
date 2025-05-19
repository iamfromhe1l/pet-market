import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ReviewsSchema } from "./reviews.schema";
import { ReturnModelType } from "@typegoose/typegoose";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Types } from "mongoose";
import { Errors } from "src/common/constants/errors";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(ReviewsSchema)
        private readonly reviewSchema: ReturnModelType<typeof ReviewsSchema>,
    ) {}

    async createReview(
        userId: Types.ObjectId,
        dto: CreateReviewDto,
        kennelId: Types.ObjectId,
    ) {
        const alreadyExists = await this.reviewSchema.exists({
            userId,
            kennelId: dto.kennelId,
        });
        if (alreadyExists) {
            throw new BadRequestException(Errors.REVIEW_ALREADY_EXISTS);
        }
        if (kennelId.toString() === dto.kennelId.toString())
            throw new ForbiddenException(Errors.CANNOT_REVIEW_YOURSELF);
        return this.reviewSchema.create({
            ...dto,
            userId,
        });
    }

    async replyToReview(
        userId: Types.ObjectId,
        kennelId: Types.ObjectId,
        reviewId: Types.ObjectId,
        message: string,
    ) {
        const review = await this.reviewSchema.findById(reviewId);

        if (!review) throw new NotFoundException(Errors.REVIEW_NOT_FOUND);

        const isOwner = review.kennelId.toString() === kennelId.toString();

        if (!isOwner) throw new ForbiddenException(Errors.YOU_ARE_NOT_AN_OWNER);

        if (review.reply)
            throw new BadRequestException(Errors.REVIEW_ALREADY_HAS_REPLY);

        review.reply = message;
        await review.save();

        return { review };
    }

    async getReviewsByKennel(kennelId: Types.ObjectId) {
        return this.reviewSchema.find({ kennelId }).exec();
    }

    async getAverageRating(kennelId: Types.ObjectId): Promise<number> {
        const result = await this.reviewSchema.aggregate([
            { $match: { kennelId: new Types.ObjectId(kennelId) } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        return result[0]?.averageRating ?? 0;
    }

    async deleteReview(reviewId: Types.ObjectId): Promise<void> {
        const deleted = await this.reviewSchema
            .findByIdAndDelete(reviewId)
            .exec();
        if (!deleted) throw new NotFoundException(Errors.REVIEW_NOT_FOUND);
    }
}
