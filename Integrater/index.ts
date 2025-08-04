import { FastifyInstance } from 'fastify';
import { Inject } from '../Decorators/index.ts';
import { Controllers } from '../configuration.ts';
import { configurations } from '../configuration.ts';
import cors from '@fastify/cors';
import chalk from 'chalk';
import { getAuthFunction } from '../auth/index.ts';
import Jwt, { JwtPayload } from 'jsonwebtoken';

export async function registerControllers(app: FastifyInstance) {


    const config = configurations
    if ('cors' in config) {
        if (config.cors) {
            await app.register(cors, config.cors)
        }
    }

    if ('JWTAuthentiaction' in config) {
        console.log("it exists")
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
            var fullPath = `${controller.prefix}${path}`;
            app.route({
                method: method.toUpperCase() as any,
                url: `/${fullPath}`,
                handler: async (request: any, reply: any) => {
                    const handler = controller.Instance[handlerName as keyof typeof controller.Instance] as Function;
                    const prototype = Object.getPrototypeOf(controller.Instance);
                    const bodyParamIndexes: number[] = Reflect.getOwnMetadata('body_params', prototype, handlerName) || [];
                    const paramCount = handler.length;

                    var args = new Array(paramCount).fill(undefined);

                    for (const index of bodyParamIndexes) {
                        args[index] = request.body;
                    }

                    //Body Keys
                    const bodyParams: Array<{ index: number; key: string }> = Reflect.getOwnMetadata('body_object_params', prototype, handlerName) || [];
                    for (const { index, key } of bodyParams) {
                        if (key != null) {
                            args[index] = request.body?.[key]
                        }
                    }


                    const RequestParam = Reflect.getOwnMetadata('RequestClosure', prototype, handlerName) || [];
                    for (const index of RequestParam) {
                        args[index] = request
                    }


                    const ResponseParam = Reflect.getOwnMetadata('ResponseClosure', prototype, handlerName) || [];
                    for (const index of ResponseParam) {
                        args[index] = reply
                    }

                    const routeParams: any = Reflect.getOwnMetadata("routeParams", prototype, handlerName) || []
                    for (const { index, key } of routeParams) {
                        args[index] = request.params[key]
                    }


                    const QueryData: any = Reflect.getOwnMetadata("QueryData", prototype, handlerName) || []
                    for (const index of QueryData) {
                        args[index] = { ...request.query }
                    }



                    const QueryObject: any = Reflect.getOwnMetadata("QueryObject", prototype, handlerName) || []
                    for (const { Index, key } of QueryObject) {
                        args[Index] = request?.query[key]
                    }




                    const HeaderData: any = Reflect.getOwnMetadata("HeaderData", prototype, handlerName) || []
                    for (const index of HeaderData) {
                        args[index] = { ...request.headers }
                    }



                    const HeaderObject: any = Reflect.getOwnMetadata("HeaderObject", prototype, handlerName) || []
                    for (const { Index, key } of HeaderObject) {
                        args[Index] = request?.headers[key]
                    }
                    if ('JWTAuthentiaction' in config) {
                        const AuthData: any = Reflect.getOwnMetadata('AuthData', prototype, handlerName) || []

                        const isAuthorized = Reflect.getMetadata('isAuthorized', prototype, handlerName)
                        if (isAuthorized) {


                            const authFunction = getAuthFunction() as any
                            if (authFunction) {
                                const injection = await Inject(authFunction.className)
                                const getClassData = Object.getPrototypeOf(injection)
                                const AuthenticatedUserData = Reflect.getMetadata('AuthData', getClassData, authFunction.AuthHandlerName)
                                const authArgs = new Array(authFunction.fn.length).fill(undefined)
                                var userData;
                                if (config.JWTAuthentiaction?.Secret) {
                                    try {
                                        Jwt.verify(request.headers.authorization, config.JWTAuthentiaction?.Secret) as JwtPayload
                                    }
                                    catch {
                                        throw "Invalid Token"
                                    }
                                    userData = Jwt.verify(request.headers.authorization, config.JWTAuthentiaction?.Secret) as JwtPayload
                                }
                                else if (!config.JWTAuthentiaction?.Secret) {
                                    throw "Please Define A Secret key in the configurations.ts"
                                }
                                for (const index of AuthenticatedUserData) {
                                    authArgs[index] = userData
                                }
                                authFunction.fn.apply(getClassData, authArgs)
                                return {
                                    Working: "true"
                                }
                            }


                            // if ( ) {
                            //     const result = await handler.apply(controller.Instance, args);
                            //     return result
                            // }
                            // else {
                            //     const result = checkAuthentication(request.headers.authorization).failureData
                            //     return result
                            // }

                        }
                        if (AuthData.length != 0) {
                            throw "UnAuthenticated Api Endpoint Cannot Call AuthData"
                        }
                    }

                    console.log(controller.Instance)
                    const result = await handler.apply(controller.Instance, args);
                    return result

                }
            });
            console.log(chalk.green(` ${method} '/${fullPath}' path is Successfully Generated `))
        }
    }


}