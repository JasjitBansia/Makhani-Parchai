let Discord = require("discord.js");
let prefix = "*";
let client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGE_REACTIONS",
  ],
});
client.on("ready", () => {
  client.user.setActivity("with myself");
  client.user.setStatus("dnd");
  console.log("ONLINE!");
  let fun = require("./Command Files/fun.js");
  let serverinfo = require("./Command Files/serverinfo.js");
  let abuse_and_danger = require("./Command Files/Abuse and danger.js");
  let botinfo = require("./Command Files/Bot info.js");
  let extra = require("./Command Files/extra.js");
  let chaotic = require("./Command Files/chaotic.js");
  let utility = require("./Command Files/utility.js");
  serverinfo.execute(Discord, client, prefix);
  fun.execute(Discord, client, prefix);
  abuse_and_danger.execute(Discord, client, prefix);
  botinfo.execute(Discord, client, prefix);
  extra.execute(Discord, prefix, client);
  chaotic.execute(Discord, client, prefix);
  utility.execute(Discord, client, prefix);
});
client.on("guildCreate", (guild) => {
  guild.channels.cache
    .find((channel) => channel.name === "general" || channel.name === "chat")
    .send(
      "Hello! I'm a bot made by another bot named shadow. My prefix is `*`. Type `*help` to see all my commands."
    );
});
client.on("messageCreate", (message) => {
  let menu = new Discord.MessageSelectMenu()
    .setCustomId("menu")
    .setPlaceholder("Help commands...")
    .addOptions([
      {
        label: "Fun commands",
        description: "Commands to timepass",
        value: "fun",
      },
      {
        label: "Server commands",
        description: "Commands to get info about server",
        value: "serverinfo",
      },
      {
        label: "DANGEROUS COMMANDS",
        description: "Commands to be abused",
        value: "abuseanddanger",
      },
      {
        label: "Bot commands",
        description: "Commands to get info about bot",
        value: "botinfo",
      },
      {
        label: "Utility commands",
        description: "Commands to avoid manual work",
        value: "utility",
      },
      {
        label: "Additional commands",
        description: "Commands not for use for functionality ",
        value: "extra",
      },
    ]);
  if (message.content.toLowerCase() === prefix + "help") {
    let row = new Discord.MessageActionRow().addComponents(menu);
    let helpEmb = new Discord.MessageEmbed()
      .setTitle("Shadow Help")
      .setColor("GREEN")
      .setImage("https://i.imgur.com/MImCgPp.png");
    message.channel
      .send({ embeds: [helpEmb], components: [row] })
      .then((msg) => {
        let collector = message.channel.createMessageComponentCollector({
          componentType: "SELECT_MENU",
          customId: "menu",
        });
        collector.on("collect", (collected) => {
          let value = collected.values[0];
          if (value === "fun") {
            collected.update({ embeds: [funEmb] });
          }
          if (value === "serverinfo") {
            collected.update({ embeds: [serverEmb] });
          }
          if (value === "abuseanddanger") {
            collected.update({ embeds: [abuseEmb] });
          }
          if (value === "botinfo") {
            collected.update({ embeds: [botEmb] });
          }
          if (value === "extra") {
            collected.update({ embeds: [extraEmb] });
          }
          if (value === "utility") {
            collected.update({ embeds: [utilityEmb] });
          }
        });
      });
    let abuseEmb = new Discord.MessageEmbed()
      .setTitle("DANGEROUS COMMANDS")
      .setColor("RED")
      .setDescription(
        "`spamping` - Yk the deal, annoy. (pings 10 times) \n`wipeout` - Wipe out EVERYONE from the server. Kick not ban btw \n`come @user` - User not coming to the chat? Force them. \n`HAO` - HAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJF"
      );
    let botEmb = new Discord.MessageEmbed()
      .setTitle("Bot commands")
      .setColor("BLUE")
      .setDescription(
        "`ping` - Latency of the bot. \n`botstatus` - Change the bot's status. \n`be *nickname*` - Change bot's nickname. \n`repo` - GitHub repository of the bot. (code)"
      );
    let extraEmb = new Discord.MessageEmbed()
      .setTitle("Additional commands")
      .setColor("YELLOW")
      .setDescription(
        "`suggest *message*` - Suggest any feature/command type stuff. \n`suggestions` - All the suggestions. \n`stfu` - Use this to force stop the bot if it gets out of control. (which it will most of the times ik)"
      );
    let funEmb = new Discord.MessageEmbed()
      .setTitle("Fun commands")
      .setColor("YELLOW")
      .setDescription(
        "`hahajoke` - Lame jokes. \n `murder` - Kill. \n `cuddle` - Cuddle. \n`randomuser` - Let the bot ping a random user if you can't think of someone.\n`randombot` - Randomuser bot version \n`question` - Basically 8ball command. \n`say` - I didn't say it, the bot did. \n`randnum` - Let the bot send a random digit between 2 values. \n`Usage - *randnum 1 5`.Here, '1' is the minimum value and '5' is the maximim. If no values are provided, the bot will just choose a number from 1 to 10"
      );
    let serverEmb = new Discord.MessageEmbed()
      .setTitle("Server commands")
      .setColor("BLUE")
      .setDescription(
        "`server` - Server's info. \n`PeopleWhoShouldNotBeMessedWith.IfMessedWithThenDeath` - People whom you don't want to mess with (cuz of perms) just in case... \n`members` - See the member stats of server (total member count, bots and humans) instead of running the server command every time."
      );
    let utilityEmb = new Discord.MessageEmbed()
      .setTitle("Utility commands")
      .setColor("ORANGE")
      .setDescription(
        "`nick @user *new name*` - Change nickname. \n`everyoneBecome` - Change everyone's nickname. \n`iu` - Convert INR to USD.\n `Usage - *iu 5` \n`ui` - Convert USD to INR."
      );
  }
});
let file = require("./JSON Files/config.json");
JSON.stringify(file);
client.login(file.data.token);
