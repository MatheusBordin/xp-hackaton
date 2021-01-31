import { HttpController } from "../types/http-controller";
import * as express from "express";
import { Controller, Post } from "../decorators/http-decorator";

@Controller()
class EventCollectionController extends HttpController {
    @Post("event")
    public live(req: express.Request, res: express.Response) {
        console.log(req.query);

        res.sendStatus(204);
    }
}

const controller = new EventCollectionController();

export const { router } = controller;
