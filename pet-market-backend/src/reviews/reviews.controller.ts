import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ObjectId, Types } from "mongoose";
import { CreateReviewDto } from "./dto/create-review.dto";
import { GetCurrentId } from "src/common/decorators/get_current_id.decorator";
import { GetCurrentKennelId } from "src/common/decorators/get_current_kennel_id.decorator";
import { ReplyReviewDto } from "./dto/reply-review.dto";
import { ParseObjectIdPipe } from "src/common/pipes/parse_object_id.pipe";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/types/roles.enum";

@Controller("reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    async createReview(
        @GetCurrentId() userId: Types.ObjectId,
        @GetCurrentKennelId() kennelId: Types.ObjectId,
        @Body() dto: CreateReviewDto,
    ) {
        return this.reviewsService.createReview(userId, dto, kennelId);
    }

    @Post(":reviewId")
    async replyToReview(
        @GetCurrentId() userId: Types.ObjectId,
        @GetCurrentKennelId() kennelId: Types.ObjectId,
        @Param("reviewId", ParseObjectIdPipe) reviewId: Types.ObjectId,
        @Body() dto: ReplyReviewDto,
    ) {
        return this.reviewsService.replyToReview(
            userId,
            kennelId,
            reviewId,
            dto.message,
        );
    }

    @Get()
    async getReviewsByKennel(@GetCurrentKennelId() kennelId: Types.ObjectId) {
        return this.reviewsService.getReviewsByKennel(kennelId);
    }

    @Get("average/:kennelId")
    async getAverageRating(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        const avg = await this.reviewsService.getAverageRating(kennelId);
        return { averageRating: avg };
    }

    @Roles(UserRole.ADMIN)
    @Delete(":reviewId")
    async deleteReview(
        @Param("reviewId", ParseObjectIdPipe) reviewId: Types.ObjectId,
    ) {
        return this.reviewsService.deleteReview(reviewId);
    }
}
