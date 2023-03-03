module.exports = {
  command: {
    name: "be",
    description: "Change the bot's nickname",
    options: [
      {
        name: "name",
        description: "Specify the name",
        type: 3,
        required: true,
      },
    ],
  },
  async execute(interaction, client) {
    if (interaction.options.data[0].value.toString().length <= 32) {
      await interaction.guild.members.cache
        .get(client.user.id.toString())
        .setNickname(interaction.options.data[0].value);
      interaction.reply(
        `Hii I'm ${
          interaction.guild.members.cache.get(client.user.id.toString())
            .displayName
        }`
      );
    } else {
      interaction.reply("Nickname should be less than or of 32 characters.");
    }
  },
};
