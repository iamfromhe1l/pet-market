import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    IsNumber,
    IsOptional,
    Max,
    IsDateString,
    IsMongoId,
    IsEnum,
} from "class-validator";
import { Types } from "mongoose";
import { SexEnum } from "src/common/types/sex.enum";

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    title: string;

    @IsDateString()
    birthDate: string;

    @IsString()
    breed: string;

    @IsMongoId()
    categoryId: Types.ObjectId;

    @IsEnum(SexEnum)
    sex: SexEnum;

    @IsOptional()
    @IsNumber()
    price?: number;

    @MinLength(10)
    @MaxLength(300)
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    count?: number;
}
