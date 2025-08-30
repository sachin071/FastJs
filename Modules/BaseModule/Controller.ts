import { AuthData, Authenticator, Authorize } from "../../auth/index.ts";
import { Controller, Get, Post, Body } from "../../Decorators/index.ts";
import { LoginModule } from "../../auth/index.ts";
import { HomeService } from "./Service.ts";

@Controller('')
export class BaseModule {

    constructor(private readonly homeservice: HomeService, private readonly loginModule: LoginModule) {
    }

    @Authorize()
    @Get("")
    async HomeFunction(@AuthData() AuthData:any) {

        return this.homeservice.HomeFunction(AuthData)
    }

    @Post("/New")
    async testingUser(@Body() BodyData: any) {
        const token = this.loginModule.Login(BodyData)
        return {
            token: token
        }
    }


}