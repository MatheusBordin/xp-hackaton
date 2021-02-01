import { AlertEventEntity } from "./alert-event";

export class GraphNode {
    public event: AlertEventEntity;
    public related: number[];
}
