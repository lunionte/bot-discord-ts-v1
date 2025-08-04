import { Client, GatewayIntentBits, Partials } from "discord.js";

export class ExtendedClient extends Client {
    constructor() {
        // construtor da classe Client (classe pai)
        super({
            // eventos em que o bot vai ter acesso para escutar
            // (por exemplo mensagens enviadas no servidor, reações em uma mensagem, conteudo de uma mensagem)
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
            // partials são objetos incompletos que o discord envia quando o bot não tem o dado em cache
            partials: [Partials.User, Partials.Message, Partials.Channel, Partials.Reaction],
        });
    }

    public start() {
        // this se refere ao objeto, que no casto também está herdando o Client
        // super se refere a classe pai
        console.log("");
        this.login(process.env.BOT_TOKEN);
    }
}
