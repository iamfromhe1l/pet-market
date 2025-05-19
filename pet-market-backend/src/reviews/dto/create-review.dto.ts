import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from "class-validator";

export class CreateReviewDto {
    @IsMongoId()
    kennelId: string;

    @IsMongoId()
    petId: string;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
}
