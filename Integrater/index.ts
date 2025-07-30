import { FastifyInstance } from 'fastify';
import { Inject } from '../Decorators/index.ts';
import { Controllers } from '../configuration.ts';
import { configurations } from '../configuration.ts';
import cors from '@fastify/cors';

export async function registerControllers(app: FastifyInstance) {


    console.clear()

    const config = configurations
    console.log(config)
    if ('cors' in config) {
        await app.register(cors, config.cors)
    }
    const controllers = Controllers
    var allRoutes = controllers.map((controller: any): { Instance: any, prefix: any, routes: any[] } => {
        return {
            Instance: Inject(controller),
            prefix: Reflect.getMetadata('prefix', controller),
            routes: Reflect.getMetadata('routes', controller) || []
        }
    })

    for (const controller of allRoutes) {
        for (const route of controller.routes) {
            const { method, path, handlerName } = route;
            const fullPath = `${controller.prefix}${path}`;
            app.route({
                method: method.toUpperCase() as any,
                url: `/${fullPath}`,
                handler: async (request:any, reply:any) => {

                    // entire Body
                    const handler = controller.Instance[handlerName as keyof typeof controller.Instance] as Function;
                    const prototype = Object.getPrototypeOf(controller.Instance);
                    const bodyParamIndexes: number[] = Reflect.getOwnMetadata('body_params', prototype, handlerName) || [];
                    const paramCount = handler.length;
                    var args = new Array(paramCount).fill(undefined);

                    for (const index of bodyParamIndexes) {
                        args[index] = await request.body;
                    }

                    //Body Keys
                    const bodyParams: Array<{ index: number; key: string }> = Reflect.getOwnMetadata('body_object_params', prototype, handlerName) || [];
                    const paramObjectCount = handler.length;
                    
                    console.log(paramObjectCount)

                    for (const { index, key } of bodyParams) {
                        if(key){
                            args[index] = request.body?.[key]
                        }
                    }

                    console.log(args)


                    
                    const result = await handler.apply(controller.Instance, args);
                    return result
                }
            });
            console.log(`/${fullPath} is binded to ${method} Method`)
        }
    }


}