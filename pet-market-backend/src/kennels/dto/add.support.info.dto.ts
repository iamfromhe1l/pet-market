import { IsOptional, IsString } from "class-validator";

export class SupportInfoDto {
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    telegramHandle?: string;
}
