import { HomeModule } from "./Modules/BaseModule/Controller.ts"


export const Controllers = [HomeModule]
export const configurations = {
    cors:{
        origin:'*',
        methods:['GET',"POST","PUT","PATCH","DELETE"],
        credentials:true
    }
}