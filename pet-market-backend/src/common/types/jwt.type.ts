import { UsersSchema } from "../../users/users.schema";

export type JwtTokens = {
    access_token: string;
    refresh_token: string;
};

export type SignType = {
    jwt: JwtTokens;
    user: UsersSchema;
};
