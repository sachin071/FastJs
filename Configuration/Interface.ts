export interface configuration{
    cors?:cors | any;
    JWTAuthentiaction?:JWTAuthentication;
}



type RequestMethods = 'GET'| "POST" | "PUT" | "PATCH" | "DELETE" | any

export interface cors{
    origin:string | any;
    methods:Array<RequestMethods>;
    credentials:Boolean;
}

export interface JWTAuthentication{

    
        Custom:boolean;
        Secret:string | undefined;
        signinOptions:JwtSigningOptions

}

type Expiry = `${string}s` | `${string}m` | `${string}h` | `${string}d` | `${string}M` | `${string}y` ;

export interface JwtSigningOptions{
    expiresin : Expiry;
}