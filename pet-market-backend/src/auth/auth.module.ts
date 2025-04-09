import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [UsersModule, ConfigModule, JwtModule.register({})],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
