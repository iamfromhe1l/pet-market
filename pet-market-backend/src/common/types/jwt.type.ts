import { Types } from "mongoose";
import { UserRole } from "./roles.enum";

export type JwtTokens = {
    access_token: string;
    refresh_token: string;
};

export type SignType = {
    jwt: JwtTokens;
    user: {
        email: string;
        username: string;
        _id: Types.ObjectId;
        role: UserRole;
        kennel?: Types.ObjectId;
    };
};
