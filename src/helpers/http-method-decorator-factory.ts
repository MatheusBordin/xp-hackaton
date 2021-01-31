import { HttpController } from "../types/http-controller";
import { HttpMethod } from "../types/http-method";
import { HttpRoute } from "../types/http-route";

/**
 * Http method decorator factory.
 *
 * @export
 * @param {HttpMethod} method Method type used to generate route.
 * @param {string} path Route path.
 * @param {*} target Controller reference.
 * @param {string} key Property key of route handler in controller.
 * @param {PropertyDescriptor} descriptor Method implementation.
 * @returns Returns http method decorator.
 */
export function HttpMethodDecoratorFactory(
    method: HttpMethod,
    path: string,
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
) {
    const route: HttpRoute = new HttpRoute();
    route.path = path;
    route.method = method;
    route.handler = key;

    const controller = target.constructor.prototype as HttpController;

    if (!controller.routes) {
        controller.routes = [];
    }

    controller.routes.push(route);

    return descriptor;
}
