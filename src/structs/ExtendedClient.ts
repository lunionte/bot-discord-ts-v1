import { ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "./types/Command";
import fs from "fs";
import path from "path";

export class ExtendedClient extends Client {
    //                 string = nome do comando | Valor = comando
    // apenas tá declarando as collections para depois colocar usando o set
    public commands: Collection<string, CommandType> = new Collection();
    public buttons: ComponentsButton = new Collection();
    public selects: ComponentsSelect = new Collection();
    public modals: ComponentsModal = new Collection();

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

    public async start() {
        // this se refere ao objeto, que no casto também está herdando o Client
        // super se refere a classe pai
        await this.registerModules();

        await this.login(process.env.BOT_TOKEN);
    }

    private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
        const guild = this.guilds.cache.get("1401578137040584786");
        if (!guild) {
            console.log("guilda não enonctrada");
            return;
        }

        guild.commands
            .set(commands)
            .then(() => {
                console.log("✅ Slash comands definidos".green);
            })
            .catch((error) => {
                console.log(`❌ Um erro ocorreu enquanto tentava definir os slash comands \n${error}`);
            });
    }
    private async registerModules() {
        const slashCommands: Array<ApplicationCommandDataResolvable> = new Array();

        const commandsPath = path.join(__dirname, "..", "commands");

        // vai ser usado dentro do filter para diminuir o código
        const filterCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");

        // ta acessando pasta
        fs.readdirSync(commandsPath).forEach((local) => {
            // ta acessando subpasta e cada arquivo
            fs.readdirSync(commandsPath + `/${local}/`)
                .filter(filterCondition)
                .forEach(async (arquivo) => {
                    const command: CommandType = await import(`../commands/${local}/${arquivo}`);
                    const { name, buttons, selects, modals } = command;
                    console.log(command);

                    if (name) {
                        this.commands.set(name, command);
                        slashCommands.push(command);

                        if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run));
                        if (selects) selects.forEach((run, key) => this.selects.set(key, run));
                        if (modals) modals.forEach((run, key) => this.modals.set(key, run));
                    }
                });
        });

        this.on("ready", () => this.registerCommands(slashCommands));
    }
}
