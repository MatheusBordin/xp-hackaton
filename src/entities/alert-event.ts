import { AlertEvent } from "../models/alert-event";

export class AlertEventEntity {
    id: number;
    label: 'AlertEvent';
    properties: AlertEvent;
}
