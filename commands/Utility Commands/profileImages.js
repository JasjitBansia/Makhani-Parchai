const { client } = require("../../index.js");
const discord = require("discord.js");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
module.exports = {
  command: {
    name: "profile-images",
    description: "Get a user's avatar and banner",
    options: [
      {
        name: "user",
        description: "The user ID or mention",
        type: 6,
        required: true,
      },
    ],
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      let userID = interaction.options.data[0].user.id;
      let user = await client.users.cache.get(userID).fetch();
      let avatarEmbed = new EmbedBuilder()
        .setTitle(`Avatar of ${user.username}`)
        .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
        .setColor("Green");
      let bannerEmbed = new EmbedBuilder()
        .setTitle(`Banner of ${user.username}`)
        .setImage(user.bannerURL({ size: 2048, dynamic: true }))
        .setColor("Green");
      let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Open avatar in browser")
          .setStyle(ButtonStyle.Link)
          .setURL(`${user.displayAvatarURL()}`)
      );
      if (user.banner !== null) {
        row.addComponents(
          new ButtonBuilder()
            .setLabel("Open banner in browser")
            .setStyle(ButtonStyle.Link)
            .setURL(`${user.bannerURL()}`)
        );
        interaction.reply({
          embeds: [avatarEmbed, bannerEmbed],
          components: [row],
        });
      } else {
        interaction.reply({
          embeds: [avatarEmbed],
          components: [row],
        });
      }
    } catch (error) {
      interaction.reply("An error occurred");
    }
  },
};
