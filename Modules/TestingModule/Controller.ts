import { Controller, Get, Post, Body } from "../../Decorators/index.ts";


@Controller('Vikas')
export class TestingController {


    @Post('/Testing')
    async GetData() {
        return "Hello World Working"
    }

}