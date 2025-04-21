import { Controller, Get } from "@nestjs/common";
import { GetCurrentId } from "../common/decorators/get_current_id.decorator";
import { Types } from "mongoose";

@Controller("users")
export class UsersController {
    @Get()
    async logout(@GetCurrentId() id: Types.ObjectId) {
        console.log("afaf");
    }
}
