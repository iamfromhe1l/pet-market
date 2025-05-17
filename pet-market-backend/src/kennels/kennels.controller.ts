import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Param,
    UseGuards,
    Patch,
    Delete,
} from "@nestjs/common";
import { KennelsService } from "./kennels.service";
import { CreateKennelDto } from "./dto/create-kennel.dto";
import { Types } from "mongoose";
import { GetCurrentId } from "../common/decorators/get_current_id.decorator";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/types/roles.enum";
import { ParseObjectIdPipe } from "src/common/pipes/parse_object_id.pipe";
import { KennelsSchema } from "./kennels.schema";
import { ReviewKennelDto } from "./dto/review-kennel.dto";
import { SupportInfoDto } from "./dto/add.support.info.dto";
import { Public } from "src/common/decorators/public.decorator";

@Controller("kennels")
export class KennelsController {
    constructor(private readonly kennelsService: KennelsService) {}

    @Post()
    async createKennel(
        @Body() dto: CreateKennelDto,
        @GetCurrentId() userId: Types.ObjectId,
    ) {
        return this.kennelsService.createKennel(dto, userId);
    }

    @Patch("invite/:kennelId/:userId")
    @Roles(UserRole.SELLER)
    async inviteUser(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
        @Param("userId", ParseObjectIdPipe) userId: Types.ObjectId,
    ) {
        return this.kennelsService.inviteUser(userId, kennelId);
    }

    @Patch("/:kennelId")
    @Roles(UserRole.SELLER)
    async leaveKennel(
        @GetCurrentId() userId: Types.ObjectId,
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.kennelsService.leaveKennel(userId);
    }

    @Patch("approve/:kennelId")
    @Roles(UserRole.ADMIN)
    async approveKennel(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.kennelsService.approveKennel(kennelId);
    }

    @Patch("reject/:kennelId")
    @Roles(UserRole.ADMIN)
    async rejectKennel(
        @Body() dto: ReviewKennelDto,
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.kennelsService.rejectKennel(kennelId, dto);
    }

    @Patch("disable/:kennelId")
    @Roles(UserRole.ADMIN)
    async disableKennel(
        @Body() dto: ReviewKennelDto,
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.kennelsService.disableKennel(kennelId, dto);
    }

    @Delete("/:kennelId")
    @Roles(UserRole.ADMIN, UserRole.SELLER)
    async deleteKennel(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        this.kennelsService.deleteKennel(kennelId);
    }

    @Get()
    async getAllKennels() {
        return this.kennelsService.getAllKennels();
    }

    @Get("/approved")
    async getApprovedKennels() {
        return this.kennelsService.getApprovedKennels();
    }

    @Get("/rejected")
    async getRejectedKennels() {
        return this.kennelsService.getRejectedKennels();
    }

    @Get("/unapproved")
    @Roles(UserRole.ADMIN)
    async getUnapprovedKennels() {
        return this.kennelsService.getUnapprovedKennels();
    }

    @Public()
    @Get(":kennelId")
    async getKennelById(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ): Promise<KennelsSchema> {
        return this.kennelsService.getKennelById(kennelId);
    }

    @Patch("/Support/:kennelId")
    async SetSupportInfo(
        @Body() dto: SupportInfoDto,
        @Param("kennelId") kennelId: Types.ObjectId,
    ) {
        this.kennelsService.SetSupportInfo(kennelId, dto);
    }
}
