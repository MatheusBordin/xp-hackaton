import { config } from "dotenv";
config();

export default {
    PORT: process.env.PORT,
    TEAMS_WEBHOOK_URL: process.env.TEAMS_WEBHOOK_URL,
}
