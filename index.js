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
    GatewayIntentBits.GuildMessageReactions,
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
  commandFiles.come.command,
  commandFiles.commandList.command,
  commandFiles.copy_paste.command,
  commandFiles.wipeout.command,
  commandFiles.everyonePing.command,
  commandFiles.setAvatar.command,
];

async function main() {
  try {
    await rest.put(Routes.applicationCommands("764047181228408873"), {
      body: [],
    });
  } catch (error) {
    console.log(error);
  }
}

main();

client.on("interactionCreate", async (interaction) => {
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
      if (interaction.commandName === "come") {
        commandFiles.come.execute(interaction);
      }
      if (interaction.commandName === "commandlist") {
        commandFiles.commandList.execute(interaction, commands);
      }
      if (interaction.commandName === "copy_paste") {
        commandFiles.copy_paste.execute(interaction);
      }
      if (interaction.commandName === "wipeout") {
        commandFiles.wipeout.chatInputCommand(interaction);
      }
      if (interaction.commandName === "everyoneping") {
        commandFiles.everyonePing.execute(interaction);
      }
      if (interaction.commandName === "set_avatar") {
        commandFiles.setAvatar.execute(interaction, client);
      }
    } catch (error) {
      interaction.reply(error.message);
    }
  } else if (interaction.isButton()) {
    try {
      commandFiles.bitcoin.buttonCommand(interaction);
      commandFiles.wipeout.buttonCommand(interaction);
    } catch (error) {
      interaction.reply(error.message);
    }
  }
});

client.on("messageReactionAdd", (reaction) => {
  let arr = ["bonk", "block", "sniff"];
  if (
    arr.includes(reaction.emoji.name) &&
    reaction.message.content.toLowerCase().includes("ara")
  ) {
    reaction.remove();
  }
});
client.on("messageCreate", async (message) => {
  try {
    if (message.content.toLowerCase() === prefix + "hao") {
      commandFiles.hao.message(message);
    }
    if (message.content.toLowerCase() === prefix + "handpic") {
      commandFiles.handpic.execute(message);
    }
    if (message.content.toLowerCase() === prefix + "pinned") {
      let pinnedMessages = (await message.channel.messages.fetchPinned()).size.toString()
      let possibleToPin = 50 - parseInt(pinnedMessages)
      message.reply(`${pinnedMessages} messages pinned in this channel. ${possibleToPin.toString()} more can be pinned`)
    }
  } catch (error) {
    console.log(error);
  }
});
client.login(tokens.bot);
