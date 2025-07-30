import { Controller, Get } from "../../Decorators/index.ts";

@Controller('')
export class HomeModule{

    @Get("")
    async HomeFunction(){
        return 'HelloWorld'
    }

}