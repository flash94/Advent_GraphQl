import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "../models/User";
import { mockUsers } from "src/_mocks_/mockUsers";
import { UserSetting } from "../models/UserSetting";
import { mockUserSettings } from "src/_mocks_/mockUserSettings";
import { CreateUserInput } from "../utils/CreateUserInput";
import { UserService } from "./UserService";
import { UserSettingService } from "./UserSettingService";

export let incrementalId = 3;
@Resolver((of) => User)
export class UserResolver{

    constructor(private userService: UserService,
        private userSettingService: UserSettingService
    ){}
    @Query((returns) => User, { nullable : true})
    getUserById(@Args('id', {type:() => Int}) id: number){
        //return mockUsers.find((user) => user.id === id);
        return this.userService.getUserById(id);
    }

    @Query(()=> [User])
    async getUsers(){
        return this.userService.getUsers();
        //return mockUsers
    }

    @ResolveField((returns) => UserSetting, {name : 'settings', nullable:true})
    getUserSettings(@Parent() user: User){
        return this.userSettingService.getUserSettingsById(user.id)
        //return mockUserSettings.find((setting) => setting.userId == user.id);
    }

    @Mutation((returns) => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput
    ){
        return this.userService.createUser(createUserData);
        // const {username, displayName} = createUserData;
        // const newUser = {username, displayName, id: ++incrementalId};
        // mockUsers.push(newUser);
        // return newUser;
        }

}