import { Injectable } from "@nestjs/common";
import { PetsSchema } from "./pets.schema";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CreatePetDto } from "./dto/pet.dto";
import { title } from "process";

@Injectable()
export class PetsService {
    constructor(
        @InjectModel(PetsSchema)
        private readonly petsSchema: ReturnModelType<typeof PetsSchema>,
    ) {}

    async createPet(dto: CreatePetDto): Promise<PetsSchema> {
        return this.petsSchema.create({
            ...dto,
            count: dto.count ?? 1,
            disabled: false,
        });
    }
}
