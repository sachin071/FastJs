import { Controller, Get, Param, Post } from "../../Decorators/index.ts";
import { HomeService } from "./Service.ts";

@Controller('')
export class BaseModule {

    constructor(private readonly homeservice: HomeService) {
    }

    @Get("")
    async HomeFunction() {
        return this.homeservice.HomeFunction()
    }

    @Get("Home")
    async HomeWorkingFunction() {
        return "Working Module"
    }


}