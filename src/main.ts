import { app } from "./app";
import config from "./config";

const port = config.PORT;

// Start Express API
app.listen(port, () => {
    console.log(`Express running on port ${port}.`);
});

export { app } from "./app";
