import * as express from "express";
import { HttpStatus } from "../utils/http-status";

/**
 * Auth for chat users.
 *
 * @export
 * @returns Returns authenticated route.
 */
export function Auth() {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const originalRoute = descriptor.value;

        descriptor.value = (req: express.Request, res: express.Response, ...args: any[]) => {
            try {
                const token = req.get("x-auth-token");

                // TODO: Validate token
                return originalRoute(req, res, ...args);
            } catch (e) {
                return res.status(HttpStatus.Unauthorized).send();
            }
        };

        return descriptor;
    };
}
