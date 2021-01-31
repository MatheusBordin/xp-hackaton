import * as express from "express";
import { RequestHandler } from "express";
import { HttpMethodDecoratorFactory } from "../helpers/http-method-decorator-factory";
import { HttpController } from "../types/http-controller";
import { HttpMethod } from "../types/http-method";
import { HttpRoute } from "../types/http-route";

/**
 * Configure controller routes.
 *
 * @export
 * @param {string} [basePath=""] Base path to be applied in all controller routes.
 * @returns Returns configured controller.
 */
export function Controller(basePath = "") {
    return (constructor: any) => {
        const controller = constructor.prototype as HttpController;
        controller.router = express.Router({ mergeParams: true });

        const routes: HttpRoute[] = HttpRoute.mapRoutes(controller.routes, basePath);

        for (const route of routes) {
            if (!route.interceptor) {
                controller.router[route.method](route.path, (controller as any)[route.handler].bind(controller));
            } else {
                controller.router[route.method](route.path, route.interceptor as any, (controller as any)[route.handler].bind(controller));
            }
        }
    };
}

/**
 * Create router handler of method 'GET'.
 *
 * @export
 * @param {string} path Route path.
 * @returns Router handler.
 */
export function Get(path: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        return HttpMethodDecoratorFactory(HttpMethod.GET, path, target, key, descriptor);
    };
}

/**
 * Create router handler of method 'PUT'.
 *
 * @export
 * @param {string} path Route path.
 * @returns Router handler.
 */
export function Put(path: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        return HttpMethodDecoratorFactory(HttpMethod.PUT, path, target, key, descriptor);
    };
}

/**
 * Create router handler of method 'POST'.
 *
 * @export
 * @param {string} path Route path.
 * @returns Router handler.
 */
export function Post(path: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        return HttpMethodDecoratorFactory(HttpMethod.POST, path, target, key, descriptor);
    };
}

/**
 * Create router handler of method 'DELETE'.
 *
 * @export
 * @param {string} path Route path.
 * @returns Router handler.
 */
export function Delete(path: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        return HttpMethodDecoratorFactory(HttpMethod.DELETE, path, target, key, descriptor);
    };
}

/**
 * Append interceptor to request.
 *
 * @export
 * @param {(req: Request, res: Response, next?: any) => void} func Interceptor function
 * @returns Router handler.
 */
export function Interceptor(func: RequestHandler) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const controller = target.constructor.prototype as HttpController;

        if (!controller.routes) {
            throw new Error("The Interceptor decorator can used only after HttpMethod decorator (Get, Post, Put, Delete).");
        }

        const route = controller.routes.find(x => x.handler === key);

        if (!route) {
            throw new Error("The Interceptor decorator can used only after HttpMethod decorator (Get, Post, Put, Delete).");
        }

        route.interceptor = func;
    };
}
