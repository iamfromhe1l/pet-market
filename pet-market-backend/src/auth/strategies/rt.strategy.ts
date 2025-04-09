import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { payloadType } from "../../common/types/strategy.payload";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("RT_SECRET"),
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: payloadType) {
        const rt = req.get("Authorization").replace("Bearer", "").trim();
        return {
            ...payload,
            rt,
        };
    }
}
