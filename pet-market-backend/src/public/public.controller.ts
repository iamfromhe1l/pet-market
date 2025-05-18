import { Controller, Get, Query } from "@nestjs/common";
import { PublicService } from "./public.service";

@Controller("public")
export class PublicController {
    constructor(private readonly publicService: PublicService) {}

    @Get("stats")
    async getStats() {
        return this.publicService.getPlatformStats();
    }

    @Get("recent-pets")
    async getRecentPets(@Query("limit") limit = 5) {
        return this.publicService.getRecentPets(+limit);
    }

    @Get("random-pets")
    getRandomPets(@Query("limit") limit = 3) {
        return this.publicService.getRandomPets(+limit);
    }
}
