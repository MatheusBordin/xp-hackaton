import fetch from "node-fetch";
import config from "../config";
import { AlertEvent } from "../models/alert-event";
import { NotificationAlertMessage } from "../models/notification-alert";

export class CommunicationService {
    public async sendToTeams(data: AlertEvent) {
        await fetch(config.TEAMS_WEBHOOK_URL, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(NotificationAlertMessage.fromAlert())
        });
    }
}

const communicationService = new CommunicationService();
export default communicationService;
