import {
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { KennelStatus } from "./create-kennel.dto";

export class ReviewKennelDto {
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @IsNotEmpty()
    adminMessage: string;

    @IsEnum(KennelStatus)
    @IsNotEmpty()
    status: KennelStatus;
}
