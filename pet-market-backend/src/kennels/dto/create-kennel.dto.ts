import { IsString, MaxLength, IsNotEmpty } from "class-validator";

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
    @MaxLength(40)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
