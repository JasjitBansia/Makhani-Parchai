let inProgress = false;
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
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
    let row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Stop")
        .setStyle(ButtonStyle.Danger)
        .setCustomId("stop")
    );
    if (inProgress === false) {
      inProgress = true;
      interaction.reply(`Pinging...`);
      for (let i = 1; i <= numberOfPings; i++) {
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
  async buttonCommand(interaction) {
    if (interaction.customId === "stop" && inProgress !== false) {
      await interaction.reply("Stopped the summoning");
      process.exit(1);
    } else {
      interaction.reply(
        `<@${interaction.user.id}> There is no cumming going on. What are you trying to stop?`
      );
    }
  },
};
