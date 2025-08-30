import { Authenticator } from "../../auth/index.ts";
import { ServiceHandler } from "../../Decorators/index.ts";

@ServiceHandler()
export class HomeService{

    async HomeFunction(AuthData:any){
        return {msg:"hello World!" , data:AuthData}
    }

    @Authenticator()
    async Authenticator(){
        return true
    }

}