import { configuration } from "./Configuration/Interface.ts"
import { BaseModule } from "./Modules/BaseModule/Controller.ts"
import dotenv from 'dotenv'
dotenv.config()



export const Controllers = [BaseModule]
export const configurations: configuration = {
    cors: {
        origin: '*',
        methods: ['GET', "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    },
    JWTAuthentiaction: {
        Custom: false,
        Secret: process.env.SECRET,
        signinOptions: {
            expiresin: '30d'
        }
    }
}