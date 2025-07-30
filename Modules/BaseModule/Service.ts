import { ServiceHandler } from "../../Decorators/index.ts";

@ServiceHandler()
export class HomeService{

    async HomeFunction(){
        return "hello World!"
    }

}