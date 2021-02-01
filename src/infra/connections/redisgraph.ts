import { Graph } from "redisgraph.js";

export const graphClient = new Graph("hackaton", "localhost", "6379");
