const { client } = require("../../index.js");
const discord = require("discord.js");
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
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let nickname = interaction.options.data[0].value;
    if (nickname.length <= 32) {
      await interaction.guild.members.cache
        .get(client.user.id.toString())
        .setNickname(nickname);
      interaction.reply(`Hii I'm ${nickname}`);
    } else {
      interaction.reply("Nickname should be less than or of 32 characters.");
    }
  },
};
