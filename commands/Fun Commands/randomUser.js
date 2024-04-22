const discord = require("discord.js");
const { client } = require("../../index");
module.exports = {
  command: { name: "randomuser", description: "Selects a random user" },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    let members = await interaction.guild.members.fetch();
    let randomuser = members.filter((m) => !m.user.bot).random().displayName;
    interaction.reply(
      `I choose **${randomuser}**. Don't question my choice :skull:`
    );
  },
};
