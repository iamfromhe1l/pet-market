import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    UseGuards,
    Patch,
} from "@nestjs/common";
import { KennelsService } from "./kennels.service";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";
import { AtGuard } from "../auth/guards/at.guard";
import { GetCurrentId } from "../common/decorators/get_current_id.decorator";

@Controller("kennels")
export class KennelsController {
    constructor(private readonly kennelsService: KennelsService) {}

    // @Post()
    // async createKennel(@Body() dto: CreateKennelDto) {
    //     return this.kennelsService.createKennel(dto);
    // }

    @Post()
    async createKennel(
        @Body() dto: CreateKennelDto,
        @GetCurrentId() userId: Types.ObjectId,
    ) {
        return this.kennelsService.createKennel(dto, userId);
    }

    @Patch()
    async leaveKennel(@GetCurrentId() userId: Types.ObjectId) {
        return this.kennelsService.leaveKennel(userId);
    }

    @Put("approve/:kennelId")
    async approveKennel(@Param("kennelId") kennelId: Types.ObjectId) {
        return this.kennelsService.approveKennel(kennelId);
    }

    @Get()
    async getAllKennels() {
        return this.kennelsService.getAllKennels();
    }

    @Get("/applied")
    async getAppliedKennels() {
        return this.kennelsService.getAppliedKennels();
    }
}
