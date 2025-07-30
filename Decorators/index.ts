import 'reflect-metadata'

const container = new Map<any, any>();

export function Controller(prefix: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('prefix', prefix, target)

        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target)
        }
        Inject(target);
    }
}

export function ServiceHandler() {
    return (target: any) => {
        Inject(target)
    }
}


export function Inject<T>(target: new (...args: any[]) => T): T {
    if (container.has(target)) {
        return container.get(target);
    }

    const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', target) || [];

    const dependencies = paramTypes.map(dep => Inject(dep));

    const instance = new target(...dependencies);
    container.set(target, instance);

    return instance;
}



export function Get(path: string): MethodDecorator {
    return (target: any, propertyKey: any) => {
        const classController = target.constructor;
        const routes: any[] = Reflect.getMetadata('routes', classController) || []
        routes.push({
            method: 'GET',
            path: path,
            handlerName: propertyKey
        })
        Reflect.defineMetadata('routes', routes, classController)
    }
}



export function Post(path: string): MethodDecorator {
    return (target: any, propertyKey: any) => {
        const classController = target.constructor;
        const routes = Reflect.getMetadata('routes', classController) || []
        routes.push({
            method: 'Post',
            path: path,
            handlerName: propertyKey
        })
        Reflect.defineMetadata('routes', routes, classController)
    }
}


export function Put(path: string) {
    return (target: any, propertyKey: any) => {
        const classController = target.constructor;
        const routes = Reflect.getMetadata('routes', classController) || []
        routes.push({
            method: 'PUT',
            path: path,
            handlerName: propertyKey
        })
        Reflect.defineMetadata('routes', routes, classController)
    }
}



export function PATCH(path: string) {
    return (target: any, propertyKey: any) => {
        const classController = target.constructor;
        const routes = Reflect.getMetadata('routes', classController) || []
        routes.push({
            method: 'PATCH',
            path: path,
            handlerName: propertyKey
        })
        Reflect.defineMetadata('routes', routes, classController)
    }
}



export function Delete(path: string) {
    return (target: any, propertyKey: any) => {
        const classController = target.constructor;
        const routes = Reflect.getMetadata('routes', classController)
        routes.push({
            method: 'DELETE',
            path: path,
            handlerName: propertyKey
        })
        Reflect.defineMetadata('routes', routes, classController)
    }
}


export function Body(): ParameterDecorator {
    return (Classname: any, FunctionName: any, DataIndex: any) => {
        const existingBodyParams: number[] = Reflect.getOwnMetadata('body_params', Classname, FunctionName) || [];
        existingBodyParams.push(DataIndex);
        Reflect.defineMetadata('body_params', existingBodyParams, Classname, FunctionName);
    }
}



export function Param(Paramname: any): ParameterDecorator {
    return (ClassName: any, FunctionName: any, Data: any) => {
        const existing = Reflect.getOwnMetadata('Parameters', ClassName, FunctionName) || {}
        Reflect.defineMetadata('Paramters', { ...existing, [Data]: Paramname }, ClassName, FunctionName)
    }
}



export function BodyObject(key: string): ParameterDecorator {
    return(ClassName: any, FunctionName: any, DataIndex: any) => {
        const existing: Array<{ index: number; key: string }> = Reflect.getOwnMetadata('body_object_params', ClassName, FunctionName) || [];
        existing.push({ index: DataIndex, key:key });
        Reflect.defineMetadata('body_object_params', existing, ClassName, FunctionName);
    };
}


export function Req():ParameterDecorator {
    return (ClassName :any , FunctionName :any , DataIndex:any) =>{
        const existing = Reflect.getOwnMetadata('RequestClosure' , ClassName , FunctionName)
        existing.push(DataIndex)
        Reflect.defineMetadata('RequestClosure' , ClassName , FunctionName)
    }
}

export function Res():ParameterDecorator {
    return (ClassName :any , FunctionName :any , DataIndex:any) =>{
        const existing = Reflect.getOwnMetadata('ResponseClosure' , ClassName , FunctionName)
        existing.push(DataIndex)
        Reflect.defineMetadata('ResponseClosure' , ClassName , FunctionName)
    }
}