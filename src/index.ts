import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import dotenv from "dotenv";
import config from "./config.json";

dotenv.config();

const client: ExtendedClient = new ExtendedClient();

client.on("ready", () => {
    console.log("🟢 BOT ONLINE 🟢".green);
});

// usando o start do ExtendedClient
client.start();

export { client, config };
