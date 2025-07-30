import { ServiceHandler } from "../../Decorators/index.ts";
import { UserReqDto } from "./interfaces.ts";


@ServiceHandler()
export class UserService {

    async SaveUser(Data: UserReqDto) {
        return Data
    }

}