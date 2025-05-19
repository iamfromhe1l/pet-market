import { IsNotEmpty, IsString } from "class-validator";

export class ReplyReviewDto {
    @IsString()
    @IsNotEmpty()
    message: string;
}
