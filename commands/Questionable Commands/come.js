let inProgress = false;
let stopState = false;
const discord = require("discord.js");
module.exports = {
  command: {
    name: "come",
    description: "Summon a member",
    options: [
      {
        name: "user",
        description: "Mention the user",
        type: 6,
        required: true,
      },
      {
        name: "limit",
        description: "Number of time the bot will ping the user",
        type: 4,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    let user = `<@${interaction.options.data[0].user.id}>`;
    let numberOfPings = interaction.options.data[1].value;
    let timesSent = 0;
    let text = `Cum here ${user}`;
    let row = new discord.ActionRowBuilder().addComponents(
      new discord.ButtonBuilder()
        .setLabel("Stop")
        .setStyle(discord.ButtonStyle.Danger)
        .setCustomId("stop")
    );
    if (inProgress === false) {
      inProgress = true;
      stopState = false;
      interaction.reply(`Pinging...`);
      for (let i = 1; i <= numberOfPings; i++) {
        if (stopState === true) {
          break;
        }
        let message = await interaction.channel.send({
          content: text,
          components: [],
        });
        timesSent++;
        if (timesSent === numberOfPings) {
          inProgress = false;
        }
        if (timesSent % 20 === 0 && numberOfPings >= 50) {
          message.edit({ content: text, components: [row] });
        }
      }
    } else {
      interaction.reply(
        "Another summoning is already in progress, try again after it ends"
      );
    }
  },
  buttonCommand(interaction) {
    if (interaction.customId === "stop" && inProgress !== false) {
      interaction.reply("Stopped the summoning");
      stopState = true;
      inProgress = false;
    } else {
      interaction.reply(
        `<@${interaction.user.id}> There is no cumming going on. What are you trying to stop?`
      );
    }
  },
};
