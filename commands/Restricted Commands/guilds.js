const discord = require("discord.js");
const { client } = require("../../index.js");
module.exports = {
  command: { name: "guilds", description: "Bot's guild list" },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.user.id === "740131838844207164") {
      let text = "";
      let index = 0;
      await client.guilds.cache.forEach((guild) => {
        index++;
        text += `**${index}.** ${guild.name}\n`;
      });
      interaction.reply({
        content: text,
        flags: discord.MessageFlags.Ephemeral,
      });
    } else {
      interaction.reply({
        content: "Restricted command",
        flags: discord.MessageFlags.Ephemeral,
      });
    }
  },
};
