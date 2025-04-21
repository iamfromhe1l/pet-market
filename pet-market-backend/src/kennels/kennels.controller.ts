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
import { AtGuard } from "../auth/guards/at.guard";
import { GetCurrentId } from "../common/decorators/get_current_id.decorator";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/types/roles.enum";
import { ParseObjectIdPipe } from "src/common/pipes/parse_object_id.pipe";
import { KennelsSchema } from "./kennels.schema";

@Controller("kennels")
export class KennelsController {
    constructor(private readonly kennelsService: KennelsService) {}

    // @Post()
    // async createKennel(@Body() dto: CreateKennelDto) {
    //     return this.kennelsService.createKennel(dto);
    // }

    @Post() //создание
    async createKennel(
        @Body() dto: CreateKennelDto,
        @GetCurrentId() userId: Types.ObjectId,
    ) {
        return this.kennelsService.createKennel(dto, userId);
    }

    @Patch("invite/:kennelId/:userId") //обновить часть
    @Roles(UserRole.SELLER)
    async inviteUser(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
        @Param("userId", ParseObjectIdPipe) userId: Types.ObjectId,
    ) {
        return this.kennelsService.inviteUser(userId, kennelId);
    }

    @Patch("/:kennelId") //обновить часть
    @Roles(UserRole.SELLER)
    async leaveKennel(
        @GetCurrentId() userId: Types.ObjectId,
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.kennelsService.leaveKennel(userId);
    }

    @Put("approve/:kennelId") //полностью обновить
    @Roles(UserRole.ADMIN)
    async approveKennel(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ) {
        return this.kennelsService.approveKennel(kennelId);
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

    @Get("/unapproved")
    async getUnapprovedKennels() {
        return this.kennelsService.getUnapprovedKennels();
    }

    @Get(":kennelId")
    async getKennelById(
        @Param("kennelId", ParseObjectIdPipe) kennelId: Types.ObjectId,
    ): Promise<KennelsSchema> {
        return this.kennelsService.getKennelById(kennelId);
    }
}
