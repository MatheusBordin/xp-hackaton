import { Router } from "express";
import { HttpRoute } from "./http-route";

/**
 * Base http controller.
 *
 * @export
 * @class HttpController
 */
export class HttpController {
    public router: Router;
    public routes: HttpRoute[];
}
