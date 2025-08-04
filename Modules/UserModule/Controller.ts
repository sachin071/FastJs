import { Controller, Get } from "../../Decorators/index.ts";
import { AuthData, Authenticator } from '../../auth/index.ts'

@Controller("User")
export class userController {

    @Authenticator()
    @Get("/NewUser")
    async NewUser(@AuthData() any: any) {
        return {
            message: "Success",
            userData: any
        }
    }


}