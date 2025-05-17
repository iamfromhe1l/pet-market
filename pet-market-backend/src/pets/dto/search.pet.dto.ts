import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsIn,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { Types } from "mongoose";
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
    @IsArray()
    @IsMongoId({ each: true })
    categoryId?: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    breed?: string[];

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsBoolean()
    populateKennel?: boolean;

    @IsOptional()
    @IsIn(["price", "title"])
    sortBy?: "price" | "title";

    @IsOptional()
    @IsIn(["asc", "desc"])
    order?: "asc" | "desc";
}
