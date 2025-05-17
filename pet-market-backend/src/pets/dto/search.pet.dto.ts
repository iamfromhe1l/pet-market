import {
    IsEnum,
    IsIn,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { SexEnum } from "src/common/types/sex.enum";

export class SearchPetDto {
    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsEnum(SexEnum)
    sex?: SexEnum;

    @IsOptional()
    @IsNumber()
    priceMin?: number;

    @IsOptional()
    @IsNumber()
    priceMax?: number;

    @IsOptional()
    @IsMongoId()
    kennelId?: string;

    @IsOptional()
    @IsMongoId()
    category?: string;

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    populateKennel?: boolean;

    @IsOptional()
    @IsIn(["price", "title"])
    sortBy?: "price" | "title";

    @IsOptional()
    @IsIn(["asc", "desc"])
    order?: "asc" | "desc";
}
