const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");
const { exec } = require("child_process");
try {
  exec("lt --port 5000 --subdomain jasjitbansia-github");
} catch (e) {
  console.log("Error");
}
const express = require("express");
const app = express();
app.use(express.json());
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
https: client.on("ready", async () => {
  console.log("Online");
  client.user.setStatus("dnd");
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

const webhookClient = new WebhookClient({
  url: tokens.webhook_url,
});
app.post("/github-webhook", (req, res) => {
  let data = req.body;
  const embed = new EmbedBuilder()
    .setTitle("Makhani Parchai-New Commit")
    .setColor("Green")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(
      data.head_commit.message + " -" + data.head_commit.committer.username
    );

  webhookClient.send({
    content: "@everyone",
    username: "Makhani-Parchai",
    avatarURL: client.user.displayAvatarURL(),
    embeds: [embed],
  });
  res.send({});
});
app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
client.login(tokens.bot);
