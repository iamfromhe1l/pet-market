import { Controller, Get, Param, Patch } from "@nestjs/common";
import { GetCurrentEmail } from "../common/decorators/get_current_email.decorator";
import { UsersService } from "./users.service";
import { UserRole } from "../common/types/roles.enum";
import { Roles } from "../common/decorators/role.decorator";
import { ParseObjectIdPipe } from "../common/pipes/parse_object_id.pipe";
import { Types } from "mongoose";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUser(@GetCurrentEmail() email: string) {
        return this.usersService.getUser(email);
    }

    @Patch("add/:userId")
    @Roles(UserRole.ADMIN)
    async addAdmin(@Param("userId", ParseObjectIdPipe) userId: Types.ObjectId) {
        return this.usersService.addAdmin(userId);
    }

    @Patch("remove/:userId")
    @Roles(UserRole.ADMIN)
    async removeAdmin(
        @Param("userId", ParseObjectIdPipe) userId: Types.ObjectId,
    ) {
        return this.usersService.removeAdmin(userId);
    }
}
