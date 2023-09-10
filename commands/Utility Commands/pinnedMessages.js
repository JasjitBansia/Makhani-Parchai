const { EmbedBuilder } = require("discord.js");
module.exports = {
  command: {
    name: "pinned",
    description: "Data about pinned messages in the channel",
  },
  embed(interaction, pinnedMessages, possibleToPin) {
    let embed = new EmbedBuilder()
      .setDescription(
        `Total messages pinned: ${pinnedMessages} \nMessages possible to pin: ${possibleToPin}`
      )
      .setColor("Green");
    interaction.reply({ embeds: [embed] });
  },
  async execute(interaction) {
    let pinnedMessages = (
      await interaction.channel.messages.fetchPinned()
    ).size.toString();
    let possibleToPin = 50 - parseInt(pinnedMessages);
    this.embed(interaction, pinnedMessages, possibleToPin)
  },
};
