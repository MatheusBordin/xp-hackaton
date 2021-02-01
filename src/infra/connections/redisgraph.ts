import { Graph } from "redisgraph.js";
import config from "../../config";

export const graphClient = new Graph("hackaton", config.REDIS_HOST, config.REDIS_PORT);
