let cooldown = false;
const { client } = require("C:/Users/HP/Desktop/Code/Makhani Parchai/index.js");
const discord = require("discord.js");
module.exports = {
  command: {
    name: "set-avatar",
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
    let attachment = interaction.options.data[0].attachment;
    if (cooldown === false) {
      if (
        attachment.contentType === "image/png" ||
        attachment.contentType === "image/jpg" ||
        attachment.contentType === "image/jpeg" ||
        attachment.contentType === "image/webp"
      ) {
        interaction.reply("Changing avatar...");
        client.user
          .setAvatar(attachment.url)
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
          "Not a supported file format. Supported formats are `.png`, `.jpg`, `.jpeg` and `.webp`"
        );
      }
    } else {
      interaction.reply(
        "Command in cooldown. You can change avatar once every 10 minutes"
      );
    }
  },
};
