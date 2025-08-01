import { Authorize } from "../../auth/index.ts";
import { Controller, Get , Post , Body } from "../../Decorators/index.ts";
import  Jwt  from "jsonwebtoken";
import { HomeService } from "./Service.ts";

@Controller('')
export class BaseModule {

    constructor(private readonly homeservice: HomeService) {
    }

    @Authorize()
    @Get("")
    async HomeFunction() {
        return this.homeservice.HomeFunction()
    }

    @Post("/New")
    async testingUser(@Body() ReqData:any){
        const secret = process.env.SECRET
        if(secret){
            const token = Jwt.sign(ReqData , secret)
            return {token:token}
        }
        
    }


}