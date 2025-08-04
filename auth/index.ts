import 'reflect-metadata'
import { ServiceHandler } from '../Decorators/index.ts'

import Jwt, { JwtPayload } from 'jsonwebtoken'
import { configurations } from '../configuration.ts'

export function Authorize(): MethodDecorator {
    return (ClassName: any, FunctionName: any) => {
        Reflect.defineMetadata('isAuthorized', true, ClassName, FunctionName)
    }
}

// export function Authenticator(): MethodDecorator {
//     return (target: any, FunctionName: any) => {
//         const className = target.constructor
//         Reflect.defineMetadata('AuthorizationFunction', FunctionName, className)
//     }
// }



export function AuthData(): ParameterDecorator {
    return (className: any, FunctionName: any, DataIndex: any) => {
        const existing = Reflect.getOwnMetadata('AuthData', className, FunctionName) || []
        console.log(className, FunctionName)
        existing.push(DataIndex)
        Reflect.defineMetadata('AuthData', existing, className, FunctionName)
    }
}




export function Authenticator(): MethodDecorator & Function {
    return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) => {
        const fn = descriptor?.value || target;
        const className = target.constructor
        const existing = Reflect.getMetadata("AuthorizationFunction", globalThis);
        if (existing) {
            throw "Multiple Methods cannot be Authentication function Please assign a single Authentication Function "
        }
        Reflect.defineMetadata("AuthorizationFunction", { fn: fn, className: className, AuthHandlerName: propertyKey }, globalThis);
    };
}

export function getAuthFunction(): Function | null {
    return Reflect.getMetadata("AuthorizationFunction", globalThis) || null;
}


@ServiceHandler()
export class LoginModule {

    Login(UserData: any) {
        var token;
        if (configurations.JWTAuthentiaction?.Secret) {
            token = Jwt.sign(UserData, configurations.JWTAuthentiaction?.Secret, configurations.JWTAuthentiaction.signinOptions)
        }
        return token
    }

}
