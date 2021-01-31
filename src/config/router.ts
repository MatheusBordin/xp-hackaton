import { Router } from "express";
import { router as HeartbeatRouter } from "../controllers/heartbeat";
import { router as EventCollectionRouter } from "../controllers/event-collector";

const router: Router = Router({ mergeParams: true });

router.use(HeartbeatRouter);
router.use(EventCollectionRouter);

export {
    router,
};
