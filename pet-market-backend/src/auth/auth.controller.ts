import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator";
import { GetCurrentEmail } from "../common/decorators/get_current_email.decorator";
import { RtGuard } from "./guards/rt.guard";
import { GetCurrentRt } from "../common/decorators/get_current_rt.decorator";
import { AuthService } from "./auth.service";
import { GetCurrentId } from "../common/decorators/get_current_id.decorator";
import { Types } from "mongoose";
import { SignType } from "../common/types/jwt.type";
import { SignupAuthDto } from "./dto/signup.auth.dto";
import { SigninAuthDto } from "./dto/signin.auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() dto: SignupAuthDto): Promise<SignType> {
        return await this.authService.signup(dto);
    }

    @Public()
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: SigninAuthDto): Promise<SignType> {
        return await this.authService.signin(dto);
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentId() id: Types.ObjectId) {
        await this.authService.logout(id);
    }

    @Public()
    @UseGuards(RtGuard)
    @HttpCode(HttpStatus.OK)
    @Post("refresh")
    async refresh(
        @GetCurrentId() id: Types.ObjectId,
        @GetCurrentEmail() email: string,
        @GetCurrentRt() rt: string,
    ): Promise<SignType> {
        return await this.authService.refresh(email, id, rt);
    }
}
