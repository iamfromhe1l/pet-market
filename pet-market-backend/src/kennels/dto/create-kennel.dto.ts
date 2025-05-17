import {
    IsString,
    MaxLength,
    IsNotEmpty,
    MinLength,
    IsOptional,
} from "class-validator";

export enum KennelStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    disabled = "disabled",
}

export class CreateKennelDto {
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(255)
    address: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(255)
    description: string;
}
