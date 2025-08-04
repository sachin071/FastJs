import { AuthData, Authenticator, Authorize } from "../../auth/index.ts";
import { Controller, Get, Post, Body } from "../../Decorators/index.ts";
import { LoginModule } from "../../auth/index.ts";
import Jwt from "jsonwebtoken";
import { HomeService } from "./Service.ts";

@Controller('')
export class BaseModule {

    constructor(private readonly homeservice: HomeService, private readonly loginModule: LoginModule) {
    }

    @Authorize()
    @Get("")
    async HomeFunction() {
        return this.homeservice.HomeFunction()
    }

    @Post("/New")
    async testingUser(@Body() BodyData: any) {
        const token = this.loginModule.Login(BodyData)
        return {
            token: token
        }
    }


}