import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { compare, genSalt, hash } from "bcryptjs";
import { createHash } from "crypto";
import { Types } from "mongoose";
import { JwtTokens, SignType } from "../common/types/jwt.type";
import { Errors } from "../common/constants/errors";
import { SignupAuthDto } from "./dto/signup.auth.dto";
import { SigninAuthDto } from "./dto/signin.auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signup({ password, ...dto }: SignupAuthDto): Promise<SignType> {
        if (await this.userService.getUser(dto.email))
            throw new BadRequestException(Errors.ALREADY_REGISTERED);
        const hash = await this.simpleHash(password);
        const user = await this.userService.createUser({
            ...dto,
            hash,
        });
        const userId = await this.userService.getUserId(dto.email);
        // TODO return id at once in createUser()
        return { jwt: await this.getTokens(dto.email, userId), user };
    }

    async signin(dto: SigninAuthDto): Promise<SignType> {
        const user = await this.userService.getUser(dto.email);
        if (!user) throw new BadRequestException(Errors.USER_NOT_FOUND);
        const isPasswordValid = await compare(dto.password, user.hash);
        if (!isPasswordValid)
            throw new BadRequestException(Errors.USER_NOT_FOUND);
        const userId = await this.userService.getUserId(dto.email);
        return { jwt: await this.getTokens(dto.email, userId), user };
    }

    async logout(id: Types.ObjectId): Promise<void> {
        await this.userService.updateRtHash(id, null);
    }

    async refresh(
        email: string,
        id: Types.ObjectId,
        rt: string,
    ): Promise<SignType> {
        const user = await this.userService.getUserById(id);
        if (!user) throw new BadRequestException(Errors.USER_NOT_FOUND);
        if (!user.rtHash)
            throw new UnauthorizedException(Errors.RT_HASH_NOT_FOUND);
        const rtMatches = await this.compareTokens(rt, user.rtHash);
        if (!rtMatches) throw new UnauthorizedException(Errors.RT_HASH_INVALID);
        const jwt = await this.getTokens(email, id);
        return { jwt, user };
    }

    async simpleHash(data: string): Promise<string> {
        const salt = await genSalt(10);
        return await hash(data, salt);
    }

    async hashToken(token: string): Promise<string> {
        const sha256Hash = createHash("sha256").update(token).digest("hex");
        const salt = await genSalt(10);
        return await hash(sha256Hash, salt);
    }

    async compareTokens(token: string, hashedToken: string): Promise<boolean> {
        const sha256Hash = createHash("sha256").update(token).digest("hex");
        return await compare(sha256Hash, hashedToken);
    }

    async getTokens(email: string, id: Types.ObjectId): Promise<JwtTokens> {
        const tokens = await this.generateTokens(email, id);
        const rtHash = await this.hashToken(tokens.refresh_token);
        await this.userService.updateRtHash(id, rtHash);
        return tokens;
    }

    async generateTokens(
        email: string,
        id: Types.ObjectId,
    ): Promise<JwtTokens> {
        const [at, rt] = await Promise.all([
            this.generateToken(
                email,
                id,
                15 * 60,
                this.configService.get("AT_SECRET"),
            ),
            this.generateToken(
                email,
                id,
                60 * 60 * 24 * 7,
                this.configService.get("RT_SECRET"),
            ),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async generateToken(
        email: string,
        id: Types.ObjectId,
        expiresIn: number,
        secret: string,
    ): Promise<string> {
        return await this.jwtService.signAsync(
            { email, id },
            { expiresIn, secret },
        );
    }
}
