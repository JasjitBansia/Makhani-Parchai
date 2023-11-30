let cooldown = false;
const { client } = require("C:/Users/HP/Desktop/Code/Makhani Parchai/index.js");
const discord = require("discord.js");
module.exports = {
  command: {
    name: "set_avatar",
    description: "Set the bot's avatar",
    options: [
      {
        name: "image",
        description: "Avatar image",
        required: true,
        type: 11,
      },
    ],
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    let url = interaction.options.data[0].attachment.url;
    if (cooldown === false) {
      if (
        url.endsWith(".png") ||
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg")
      ) {
        interaction.reply("Changing avatar...");
        client.user
          .setAvatar(interaction.options.data[0].attachment.url)
          .then(() => {
            interaction.editReply("Avatar set");
            cooldown = true;
            setTimeout(() => {
              cooldown = false;
            }, 600000);
          })
          .catch(() => {
            interaction.editReply("An error occured");
          });
      } else {
        interaction.reply(
          "Not a supported file format. Supported formats are `.png`, `.jpg`, `.jpeg`"
        );
      }
    } else {
      interaction.reply(
        "Command in cooldown. You can change avatar once every 10 minutes"
      );
    }
  },
};
