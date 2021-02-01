export interface IZabbixAlert {
    URL: string;
    Subject: string;
    Message: string;
}

export interface IZabbixAlertMessage {
    startedTime: string;
    startedDate: string;
    name: string;
    severity: string;
    data: string;
    id: string;
    triggerUrl: string;
    host: string;
}
