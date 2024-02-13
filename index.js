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
    await rest.put(Routes.applicationCommands("764047181228408873"), {
      body: commands,
    });
  } catch (error) {
    console.log(error);
  }
}
main();
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
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
  } else if (interaction.isButton()) {
    //come.js's stop summoning button
    const comeFile = require("./commands/Questionable Commands/come.js");
    comeFile.buttonCommand(interaction);
  }
});

client.login(tokens.bot);
