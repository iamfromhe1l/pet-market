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
import { SexEnum } from "src/common/types/sex.enum";

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    title: string;

    @IsDateString()
    birthDate: string;

    @IsMongoId()
    category: string;

    @IsEnum(SexEnum)
    sex: SexEnum;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsMongoId()
    kennel: string;

    @MinLength(10)
    @MaxLength(300)
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    count?: number;
}
