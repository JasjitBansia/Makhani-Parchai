const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const commandFiles = require("./commandFilePath.js");
const tokens = require("./tokens.json");

const prefix = "*";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Online");
  client.user.setPresence({ status: "dnd" });
});

const rest = new REST({ version: "10" }).setToken(tokens.bot);
const commands = [
  commandFiles.ping.command,
  commandFiles.randomUser.command,
  commandFiles.say.command,
  commandFiles.hao.command,
  commandFiles.be.command,
  commandFiles.choose.command,
  commandFiles.weather.command,
  commandFiles.handpic.command,
  commandFiles.bitcoin.command,
  commandFiles.repository.command,
  commandFiles.meaning.command,
  commandFiles.come.command,
  commandFiles.commandList.command,
];

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

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    try {
      if (interaction.commandName === "ping") {
        commandFiles.ping.execute(interaction, client);
      }
      if (interaction.commandName === "randomuser") {
        commandFiles.randomUser.execute(interaction);
      }
      if (interaction.commandName === "say") {
        commandFiles.say.execute(interaction);
      }
      if (interaction.commandName === "hao") {
        commandFiles.hao.slash(interaction);
      }
      if (interaction.commandName === "be") {
        commandFiles.be.execute(interaction, client);
      }
      if (interaction.commandName === "choose") {
        commandFiles.choose.execute(interaction);
      }
      if (interaction.commandName === "weather") {
        commandFiles.weather.execute(interaction);
      }
      if (interaction.commandName === "handpic") {
        commandFiles.handpic.execute(interaction);
      }
      if (interaction.commandName === "bitcoin") {
        commandFiles.bitcoin.chatInputCommand(interaction);
      }
      if (interaction.commandName === "repository") {
        commandFiles.repository.execute(interaction);
      }
      if (interaction.commandName === "meaning") {
        interaction.reply(
          `The meaning command is not working due to a Discord.js deferReply issue. I apologise for the knowledge and wisdom you are missing out on due to this`
        );
      }
      if (interaction.commandName === "come") {
        commandFiles.come.execute(interaction);
      }
      if (interaction.commandName === "commandlist") {
        commandFiles.commandList.execute(interaction, commands);
      }
    } catch (error) {
      interaction.reply(error.message);
    }
  } else if (interaction.isButton()) {
    try {
      commandFiles.bitcoin.buttonCommand(interaction);
    } catch (error) {
      interaction.reply(error.message);
    }
  }
});

client.on("messageCreate", (message) => {
  try {
    if (message.content.toLowerCase() === prefix + "hao") {
      commandFiles.hao.message(message);
    }
    if (message.content.toLowerCase() === prefix + "handpic") {
      commandFiles.handpic.execute(message);
    }
    if (
      message.content.includes("ara") &&
      message.author.id !== "539796772323590164"
    ) {
      try {
        setTimeout(() => {
          message.reactions.removeAll();
        }, 10000);
      } catch {
        return null;
      }
    }
  } catch (error) {
    message.reply(error.message);
  }
});
client.login(tokens.bot);
