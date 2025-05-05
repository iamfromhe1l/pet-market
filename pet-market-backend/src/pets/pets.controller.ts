import { Body, Controller, Post } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDto } from "./dto/pet.dto";

@Controller("pets")
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Post()
    async createPet(@Body() dto: CreatePetDto) {
        return this.petsService.createPet(dto);
    }
}
