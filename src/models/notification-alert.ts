export class NotificationAlertMessage {
    public static fromAlert() {
        const message = new NotificationAlertMessage();
        message.title = "Testando";
        message.text = "Testando message";

        return message;
    }

    private constructor() {
    }

    public title: string;
    public text: string;
}
