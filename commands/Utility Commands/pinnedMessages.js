const discord = require("discord.js");
module.exports = {
  command: {
    name: "pinned",
    description: "Data about pinned messages in the channel",
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let pinnedMessages = (
      await interaction.channel.messages.fetchPinned()
    ).size.toString();
    let possibleToPin = 50 - parseInt(pinnedMessages);
    let embed = new discord.EmbedBuilder()
      .setDescription(
        `Total messages pinned: ${pinnedMessages} \nMessages possible to pin: ${possibleToPin}`
      )
      .setColor("Green");
    interaction.reply({ embeds: [embed] });
  },
};
