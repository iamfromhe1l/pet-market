import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { getMongoConfig } from "./db/mongo.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModule } from "./auth/auth.module";
import { AtGuard } from "./auth/guards/at.guard";
import { APP_GUARD } from "@nestjs/core";
import { RBACGuard } from "./auth/guards/rbac.guard";
import { PetsModule } from './pets/pets.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        UsersModule,
        AuthModule,
        PetsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RBACGuard,
        },
    ],
})
export class AppModule {}
