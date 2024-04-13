const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
const tokens = require("./tokens.json");
const mongodb = require("mongodb");
const MongoClient = new mongodb.MongoClient(tokens.mongodb_connection_string);
const prefix = "*";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

let commands = [];

client.on("ready", () => {
  console.log("Online");
  MongoClient.connect();
  console.log("Connected to db");
  client.user.setStatus("dnd");
  let privateStuff = require("./privatestuff.js");
  privateStuff.execute(client);
  let news = require("./Breaking News/news.js");
  news.execute();
});
const rest = new REST({ version: "10" }).setToken(tokens.bot);

let categories = [
  "Utility Commands",
  "Bot Commands",
  "Questionable Commands",
  "Fun Commands",
  "Restricted Commands",
  "Misc. Commands",
];
module.exports = { client, categories, MongoClient };
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
  if (interaction.user.id === "878233305164705792") {
    interaction.reply(
      "How dare you even have the thoughts of using someone as amazing as me? Get your filthy hands off of me"
    );
  } else {
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
      //come.js's stop summoning button
      const comeFile = require("./commands/Questionable Commands/come.js");
      comeFile.buttonCommand(interaction);
    }
  }
});

client.login(tokens.bot);
