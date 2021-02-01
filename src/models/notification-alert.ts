import { AlertEventEntity } from "../entities/alert-event";
import { AlertEvent } from "./alert-event";

const tsToDate = (ts: number) => {
    const date = new Date(ts);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export class NotificationAlertMessage {
    public static fromAlert(alert: AlertEvent, id: number) {
        return {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "f0624d",
            "summary": "Novo incidente!",
            "sections": [{
                "activityTitle": "Novo incidente!",
                "activitySubtitle": "Na aplicação " + alert.application,
                "activityImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpuJfbaM9ha0kqq4HQCxhbUd8HvPVBaMxgw&usqp=CAU",
                "facts": [{
                    "name": "Severity",
                    "value": alert.severity
                }, {
                    "name": "Data",
                    "value": tsToDate(alert.timestamp)
                }, {
                    "name": "Message",
                    "value": alert.message
                }],
                "markdown": true
            }],
            "potentialAction": [{
                "@type": "OpenUri",
                "name": "Ver Detalhes",
                "targets": [{
                    "os": "default",
                    "uri": `http://mercuriofront.z15.web.core.windows.net/incident/${id}`
                }]
            }]
        };
    }

    public static fromRelatedAlert(issue: AlertEventEntity, data: AlertEvent) {
        return {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "f0624d",
            "summary": "Novo evento relacionado a incidente!",
            "sections": [{
                "activityTitle": "Novo evento relacionado a incidente!",
                "activitySubtitle": "Relacionado ao incidente na aplicação: " + issue.properties.application,
                "activityImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpuJfbaM9ha0kqq4HQCxhbUd8HvPVBaMxgw&usqp=CAU",
                "facts": [{
                    "name": "Aplicação",
                    "value": data.application
                }, {
                    "name": "Severity",
                    "value": data.severity
                }, {
                    "name": "Data",
                    "value": tsToDate(data.timestamp)
                }, {
                    "name": "Message",
                    "value": data.message
                }],
                "markdown": true
            }],
            "potentialAction": [{
                "@type": "OpenUri",
                "name": "Ver Detalhes",
                "targets": [{
                    "os": "default",
                    "uri": `http://mercuriofront.z15.web.core.windows.net/incident/${issue.id}`
                }]
            }]
        };
    }

    private constructor() {
    }
}
