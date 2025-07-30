import { Body, BodyObject, Controller, Get, Post } from "../../Decorators/index.ts";
import { UserReqDto, userResDTO } from "./interfaces.ts";
import { UserService } from "./service.ts";

@Controller('Users')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get('/Users')
    async UsersGetFunction() {

    }


    @Post('/Save')
    async CreateUserFunction(@Body() BodyData: UserReqDto, @BodyObject('firstname') firstName: any): Promise<any> {
        return {
            entireBody: BodyData,
            name:firstName
        }
    }
}