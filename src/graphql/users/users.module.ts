import { Module } from "@nestjs/common";
import { UserResolver } from "./UserResolver";
import { UserService } from "./UserService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../models/User";
import { UserSettingService } from "./UserSettingService";
import { UserSetting } from "../models/UserSetting";
import { UserSettingsResolver } from "../resolvers/UserSettingsResolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserSetting])
    ],
    providers: [UserResolver, UserService, UserSettingsResolver, UserSettingService],
})
export class UsersModule {}