const discord = require("discord.js");
module.exports = {
  command: {
    name: "ban",
    description: "Ban a user",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to ban",
        required: true,
      },
    ],
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let user = interaction.guild.members.cache.get(
      interaction.options.data[0].value
    );
    let callingUser = interaction.guild.members.cache.get(interaction.user.id);
    if (
      callingUser.permissions.has("Administrator") ||
      callingUser.permissions.has("BanMembers") ||
      callingUser.guild.ownerId === callingUser.id
    ) {
      if (callingUser.id !== user.id) {
        try {
          await user.ban();
          interaction.reply(`Banned **${user.user.username}**`);
        } catch (error) {
          interaction.reply({
            content: `An error occurred: ${error.message}`,
            flags: discord.MessageFlags.Ephemeral,
          });
        }
      } else {
        interaction.reply({
          content: "Cannot ban yourself",
          flags: discord.MessageFlags.Ephemeral,
        });
      }
    } else {
      interaction.reply({
        content: "You do not have permission to ban users",
        flags: discord.MessageFlags.Ephemeral,
      });
    }
  },
};
