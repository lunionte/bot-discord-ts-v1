import { ApplicationCommandType } from "discord.js";
import { Command } from "../../structs/types/Command";

export default new Command({
    name: "ping",
    description: "De /ping para dar um ping",
    type: ApplicationCommandType.ChatInput,
    run({ interaction }) {
        // ephemeral só pode ser vista por quem usou o comando
        interaction.reply({ ephemeral: true, content: "pong" });
    },
});
