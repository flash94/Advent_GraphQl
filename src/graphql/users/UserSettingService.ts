import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSetting } from "../models/UserSetting";
import { Repository } from "typeorm";
import { CreateUserSettingsInput } from "../utils/CreateUserSettingsInput";
import { User } from "../models/User";

@Injectable()
export class UserSettingService{
    constructor(
        @InjectRepository(UserSetting) 
        private userSettingsRepository: Repository<UserSetting>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    getUserSettingsById(userId: number){
        return this.userSettingsRepository.findOneBy({
            userId
        })
    }

    async createUserSettings(createUserSettingsData: CreateUserSettingsInput){
        const findUser = await this.userRepository.findOneBy({
            id: createUserSettingsData.userId,
        });

        if(!findUser) throw new Error('User Not Found');

        const newUserSetting = this.userSettingsRepository.create(
            createUserSettingsData,
        );
        const savedsettings = await this.userSettingsRepository.save(newUserSetting);

        findUser.settings = savedsettings;
        await this.userRepository.save(findUser);

        return savedsettings;
    }

}