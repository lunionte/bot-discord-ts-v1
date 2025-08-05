import { ClientEvents } from "discord.js";

// EVENTOS são ações que acontecem no Discord e que o bot pode escutar automaticamente.
// Exemplos de eventos: 'ready', 'messageCreate', 'interactionCreate', etc.
// Eles permitem que o bot reaja a qualquer coisa que ocorra no servidor, como mensagens novas ou cliques em botões.

// COMANDOS são instruções específicas enviadas pelo usuário, geralmente via slash (/comando),
// que o bot reconhece e responde com uma ação programada.

// Ou seja:
// - COMANDOS = o usuário inicia a ação (ex: /ping)
// - EVENTOS = o Discord dispara algo e o bot reage automaticamente (ex: alguém envia uma mensagem)

export type EventType<Key extends keyof ClientEvents> = {
    name: Key;
    once?: boolean;
    run(...args: ClientEvents[Key]): any;
};

export class Event<Key extends keyof ClientEvents> {
    constructor(options: EventType<Key>) {
        Object.assign(this, options);
    }
}

// const cmd =  new Event({
//     name: "ready",  // nome do evento que vamos escutar
//     once: true,     // executar apenas uma vez (quando o bot liga)
//     run(client) {   // função executada ao disparar o evento
//         console.log(`Bot iniciado como ${client.user?.tag}`);
//     }
// })
