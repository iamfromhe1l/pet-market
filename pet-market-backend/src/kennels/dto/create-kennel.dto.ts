import { IsString, MaxLength, IsNotEmpty, MinLength } from "class-validator";

export enum KennelStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    disabled = "disabled",
}

// class SupportInfo {
//     @IsOptional()
//     @IsString()
//     phone?: string;

//     @IsOptional()
//     @IsString()
//     telegramHandle?: string;
// }

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
