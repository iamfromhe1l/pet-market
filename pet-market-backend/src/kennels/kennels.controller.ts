import { Controller, Post, Body, Get, Put, Param } from "@nestjs/common";
import { KennelsService } from "./kennels.service";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";

@Controller("kennels")
export class KennelsController {
    constructor(private readonly kennelsService: KennelsService) {}

    @Post()
    async createKennel(@Body() dto: CreateKennelDto) {
        return this.kennelsService.createKennel(dto);
    }

    @Put("approve/:kennelId")
    async approveKennel(@Param("kennelId") kennelId: Types.ObjectId) {
        return this.kennelsService.approveKennel(kennelId);
    }

    @Get("applied")
    async getAppliedKennels() {
        return this.kennelsService.getAppliedKennels();
    }

    @Get()
    async getAllKennels() {
        return this.kennelsService.getAllKennels();
    }
}
