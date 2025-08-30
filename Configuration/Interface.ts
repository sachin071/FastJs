import { FastifyCorsOptions } from "@fastify/cors";
import Jwt from "jsonwebtoken";

export interface configuration {
    cors?: FastifyCorsOptions;
    JWTAuthentiaction?: JWTAuthentication;
}




export interface JWTAuthentication {

    Secret: string | undefined;
    signinOptions: Jwt.SignOptions

}

