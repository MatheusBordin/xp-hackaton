import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import { router } from "./config/router";

export const app: express.Application = express();

// Settings
app.use(morgan("tiny"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// Routes
app.use("/v1", router);
