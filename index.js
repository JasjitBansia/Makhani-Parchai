const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const fs = require("fs");
const tokens = require("./tokens.json");
const prefix = "*";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

let commands = [];

client.on("ready", () => {
  console.log("Online");
  client.user.setPresence({ status: "dnd" });
  let privateStuff = require("./privatestuff.js");
  privateStuff.execute(client);
});
const rest = new REST({ version: "10" }).setToken(tokens.bot);

let categories = [
  "Utility Commands",
  "Bot Commands",
  "Questionable Commands",
  "Fun Commands",
  "Restricted Commands",
];
module.exports = { client, categories };
for (category of categories) {
  let commandFiles = fs
    .readdirSync(`./commands/${category}`)
    .filter((file) => file.endsWith(".js"));
  for (file of commandFiles) {
    let command = require(`./commands/${category}/${file}`);
    commands.push(command.command);
  }
}
async function main() {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        "764047181228408873",
        "790827946746314782"
      ),
      {
        body: commands,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
main();

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand) {
    for (category of categories) {
      let commandFiles = fs
        .readdirSync(`./commands/${category}`)
        .filter((file) => file.endsWith(".js"));
      for (file of commandFiles) {
        let command = require(`./commands/${category}/${file}`);
        if (interaction.commandName === command.command.name) {
          command.execute(interaction);
          break;
        }
      }
    }
  }
});

client.login(tokens.bot);
