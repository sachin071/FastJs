import { UserController } from "./Modules/Usermodule/Controller.ts"
import { TestingController } from "./Modules/TestingModule/Controller.ts"

export const Controllers = [UserController,TestingController]
export const configurations = {
    cors:{
        origin:'*',
        methods:['GET',"POST","PUT","PATCH","DELETE"],
        credentials:true
    }
}