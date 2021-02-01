import { config } from "dotenv";
config();

export default {
    PORT: process.env.PORT,
    TEAMS_WEBHOOK_URL: process.env.TEAMS_WEBHOOK_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
}
