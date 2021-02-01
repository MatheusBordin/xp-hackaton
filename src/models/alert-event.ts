import { IZabbixAlert, IZabbixAlertMessage } from "../dto/zabbix-alert";

export class AlertEvent {
    public static fromBody(value: IZabbixAlert)  {
        const message = JSON.parse(value.Message) as IZabbixAlertMessage;

        if (!!message.name.match(/TIER:/g)) {
            return this.fromAppDynamics(message);
        }

        return null;
    }

    private static fromAppDynamics(message: IZabbixAlertMessage) {
        const result = new AlertEvent();
        const tier = message.name.split("|").find(x => !!x.match('TIER:')).replace(/(TIER)|:|\s/g, '');
        const timestamp = [
            ...message.startedDate
                .split('.'),
            ...message.startedTime
                .split(':'),
        ].map(x => parseInt(x, 10));

        result.application = tier;
        result.message = message.name;
        result.timestamp = new Date(
            timestamp[0],
            timestamp[1],
            timestamp[2],
            timestamp[3],
            timestamp[4],
            timestamp[5],
        ).getTime();
        result.severity = parseInt(message.severity.replace(/\D/g, ''), 10);

        return result;
    }

    private constructor() {}

    public application: string;
    public timestamp: number;
    public message: string;
    public severity: number;
}
