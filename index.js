const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const mongodb = require("mongodb");
const fs = require("fs");
const path = require("path");
const tokens = require("./tokens.json");
const mongoClient = new mongodb.MongoClient(tokens.mongoDB_URI);
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
  await mongoClient.connect();
  console.log("Connected to db");
  client.user.setStatus("dnd");
  setTimeout(() => {
    if (client.user.presence.status !== "dnd") {
      client.user.setStatus("dnd");
    }
  }, 3600000);
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
  "Pushup Commands",
];
module.exports = { client, categories, prefix, mongoClient };
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
});
client.login(tokens.bot);
