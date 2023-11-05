const { client } = require("C:/Users/HP/Desktop/Code/Makhani Parchai/index.js");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
module.exports = {
  command: {
    name: "get-avatar",
    description: "Get a user's avatar",
    options: [
      {
        name: "user",
        description: "The user ID or mention",
        type: 6,
        required: true,
      },
    ],
  },
  execute(interaction) {
    try {
      let userID = interaction.options.data[0].user.id;
      let user = client.users.cache.get(userID);
      let embed = new EmbedBuilder()
        .setTitle(`Avatar of ${user.username}`)
        .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
        .setColor("Green");
      let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Open in browser")
          .setStyle(ButtonStyle.Link)
          .setURL(`${user.displayAvatarURL()}`)
      );
      interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      interaction.reply("An error occurred");
    }
  },
};
