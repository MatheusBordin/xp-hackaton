import fetch from "node-fetch";
import config from "../config";
import { AlertEventEntity } from "../entities/alert-event";
import { AlertEvent } from "../models/alert-event";
import { NotificationAlertMessage } from "../models/notification-alert";

export class CommunicationService {
    public async sendRootEvent(data: AlertEvent, id: number) {
        await fetch(config.TEAMS_WEBHOOK_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NotificationAlertMessage.fromAlert(data, id))
        });
    }

    public async sendRelatedEvent(issue: AlertEventEntity, data: AlertEvent) {
        await fetch(config.TEAMS_WEBHOOK_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NotificationAlertMessage.fromRelatedAlert(issue, data))
        });
    }
}

const communicationService = new CommunicationService();
export default communicationService;
