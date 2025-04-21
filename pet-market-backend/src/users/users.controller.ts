import { Controller, Get } from "@nestjs/common";
import { GetCurrentEmail } from "../common/decorators/get_current_email.decorator";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUser(@GetCurrentEmail() email: string) {
        return this.usersService.getUser(email);
    }
}
