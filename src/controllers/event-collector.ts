import { HttpController } from "../types/http-controller";
import * as express from "express";
import { Controller, Get, Post } from "../infra/decorators/http-decorator";
import { AlertEvent } from "../models/alert-event";
import eventAggregationService from "../service/event-aggregation";

@Controller()
class EventCollectionController extends HttpController {
    @Post("event")
    public async event(req: express.Request, res: express.Response) {
        try {
            const data = AlertEvent.fromBody(req.body);
            if (data == null) {
                return res.sendStatus(204);
            }

            const entity = await eventAggregationService.aggregate(data);
            if (entity != null) {
                return res.json(entity);
            }
            // await communicationService.sendToTeams(data);

            res.sendStatus(204);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Get("issue")
    public async issues(req: express.Request, res: express.Response) {
        try {
            const entity = await eventAggregationService.listThrees();
            return res.json(entity);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    @Get("issue/:id")
    public async three(req: express.Request, res: express.Response) {
        try {
            const entity = await eventAggregationService.findThreeByRootId(parseInt(req.params.id, 10));
            return res.json(entity);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}

const controller = new EventCollectionController();

export const { router } = controller;
