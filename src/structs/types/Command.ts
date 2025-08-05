import {
    ApplicationCommandData,
    ButtonInteraction,
    Collection,
    CommandInteraction,
    CommandInteractionOptionResolver,
    ModalSubmitInteraction,
    StringSelectMenuInteraction,
} from "discord.js";

// A ESTRUTURA BÁSICA DE COMANDO É PARA EXATAMENTE COMANDOS, COMO /PING, QUE QUANDO O USUARIO DIGITA O COMANDO FAZ ALGO

import { ExtendedClient } from "../ExtendedClient";

// `interaction` representa o comando sendo executado, ex: /ping → interaction.reply(...)
// `client` acessa dados do bot, como cache de usuários, guilds e collections
// `options` pega os argumentos enviados no comando, ex: /ban @user motivo: spam
interface CommandProps {
    client: ExtendedClient;
    interaction: CommandInteraction;
    options: CommandInteractionOptionResolver;
}

// Quando alguém clica em um botão, o ID (string) é usado para encontrar a função que será executada
// Por exemplo, se criar um botão "confirmar", ele é adicionado à Collection com seu ID,
// e essa função pode ser reutilizada sempre que o botão for clicado
export type ComponentsButton = Collection<string, (interaction: ButtonInteraction) => any>;

export type ComponentsSelect = Collection<string, (interaction: StringSelectMenuInteraction) => any>;
export type ComponentsModal = Collection<string, (interaction: ModalSubmitInteraction) => any>;

// define possíveis interações extras que o comando pode enviar: botões, selects ou modais
interface CommandComponents {
    buttons?: ComponentsButton;
    selects?: ComponentsSelect;
    modals?: ComponentsModal;
}

// tipo final de um comando: dados básicos do comando + funções que ele executa

export type CommandType = ApplicationCommandData &
    CommandComponents & {
        run(props: CommandProps): any;
    };

export class Command {
    constructor(options: CommandType) {
        // não permite uso em dms
        options.dmPermission = false;
        // copia todas as propriedades de options para o objeto criado
        Object.assign(this, options);
    }
}

// const cmd =  new Command({
//     name: "ping",
//     description: "Responde com Pong!",
//     run: async ({ interaction }) => {
//         await interaction.reply("Pong!");
//     }
// })
