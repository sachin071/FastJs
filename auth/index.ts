import 'reflect-metadata'

export function Authorize() : MethodDecorator {
    return (ClassName :any, FunctionName:any)=>{
        Reflect.defineMetadata('isAuthorized' , true , ClassName, FunctionName )
    }
}