import { Types } from "mongoose";
import { UserRole } from "./roles.enum";

export type payloadType = {
    email: string;
    id: Types.ObjectId;
    role: UserRole;
    kennelId?: Types.ObjectId;
};
