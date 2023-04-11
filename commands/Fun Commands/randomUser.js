module.exports = {
  command: { name: "randomuser", description: "Selects a random user" },
  execute(interaction) {
    let members = interaction.guild.members.cache
      .filter((member) => !member.user.bot)
      .random().displayName;
    interaction.reply(
      `I choose **${members}**. Don't question my choice :skull:`
    );
  },
};
