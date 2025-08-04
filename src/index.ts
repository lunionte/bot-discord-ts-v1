import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import dotenv from "dotenv";

dotenv.config();

const client: ExtendedClient = new ExtendedClient();

client.on("ready", () => {
    console.log("🟢 BOT ONLINE 🟢".green);
});

client.start();

export { client };
