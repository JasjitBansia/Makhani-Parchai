const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const tokens = require("./tokens.json");
const prefix = "*";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ],
});
let commands = [];

client.on("ready", async () => {
  console.log("Online");
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
  "Moderation Commands",
];
module.exports = { client, categories, prefix };
for (category of categories) {
  let commandFiles = fs
    .readdirSync(path.join(__dirname + `/commands/${category}`))
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
  if (interaction.context === 0) {
    if (interaction.isCommand()) {
      for (category of categories) {
        let commandFiles = fs
          .readdirSync(path.join(__dirname + `/commands/${category}`))
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
      const comeFile = require("./commands/Questionable Commands/come.js");
      comeFile.buttonCommand(interaction);
    }
  } else {
    interaction.reply("Cannot execute commands in dm");
  }
});
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    let tokens = message.content.trim().split(prefix);
    let command =
      tokens[1].split(" ").length > 1 ? tokens[1].split(" ")[0] : tokens[1];
    let files = fs
      .readdirSync(path.join(__dirname + "/Message Commands"))
      .filter((file) => file.endsWith(".js"));
    files.forEach((file) => {
      if (command.toLowerCase() === file.split(".")[0]) {
        let commandFile = require(`./Message Commands/${file}`);
        commandFile.execute(message);
      }
    });
  }
});
client.login(tokens.bot);
