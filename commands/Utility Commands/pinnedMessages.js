const { EmbedBuilder } = require("discord.js");
module.exports = {
  command: {
    name: "pinned",
    description: "Data about pinned messages in the channel",
  },

  async execute(interaction) {
    let pinnedMessages = (
      await interaction.channel.messages.fetchPinned()
    ).size.toString();
    let possibleToPin = 50 - parseInt(pinnedMessages);
    let embed = new EmbedBuilder()
      .setDescription(
        `Total messages pinned: ${pinnedMessages} \nMessages possible to pin: ${possibleToPin}`
      )
      .setColor("Green");
    interaction.reply({ embeds: [embed] });
  },
};
