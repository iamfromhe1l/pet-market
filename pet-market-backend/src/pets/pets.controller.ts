import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDto } from "./dto/pet.dto";
import { PetsSchema } from "./pets.schema";
import { SearchPetDto } from "./dto/search.pet.dto";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/types/roles.enum";
import { ParseObjectIdPipe } from "src/common/pipes/parse_object_id.pipe";
import { Types } from "mongoose";

@Controller("pets")
export class PetsController {
    constructor(private readonly petsService: PetsService) {}
    @Roles(UserRole.SELLER)
    @Post("/kennels/:kennelId")
    async createPet(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
        @Body() dto: CreatePetDto,
    ): Promise<PetsSchema> {
        return this.petsService.createPet(kennelId, dto);
    }

    @Get("/kennels/:kennelId")
    async getPetsByKennel(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.petsService.getPetsByKennel(kennelId);
    }

    @Get(":petId")
    async getPetById(@Param("petId", ParseObjectIdPipe) petId: Types.ObjectId) {
        return this.petsService.getPetById(petId);
    }

    @Patch(":petId")
    @Roles(UserRole.SELLER)
    async updatePet(
        @Param("petId", ParseObjectIdPipe) petId: Types.ObjectId,
        @Body() dto: Partial<CreatePetDto>,
    ) {
        return this.petsService.updatePet(petId, dto);
    }

    @Roles(UserRole.SELLER)
    @Delete(":petId")
    async deletePet(@Param("petId", ParseObjectIdPipe) petId: Types.ObjectId) {
        return this.petsService.deletePet(petId);
    }

    @Post("search")
    async searchPets(@Body() filter: SearchPetDto) {
        return this.petsService.searchPets(filter);
    }
}
