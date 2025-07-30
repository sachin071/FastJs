import { Controller, Get, Param , Post} from "../../Decorators/index.ts";
import { HomeService } from "./Service.ts";

@Controller('')
export class HomeModule{

    constructor(private readonly homeservice : HomeService){
    }

    @Get("")
    async HomeFunction(){
        return this.homeservice.HomeFunction()
    }


}