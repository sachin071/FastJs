import { Body, Controller, Get } from "../../Decorators/index.ts";
import { TestService } from "./service.ts";


@Controller('/Test')
export class TestController {

    constructor(private readonly test: TestService) { }

    @Get('/Home')
    async HomeFunction(@Body() BodyData: string) {

    }

}