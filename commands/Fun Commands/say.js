const discord = require("discord.js");
module.exports = {
  command: {
    name: "say",
    description: "Make the bot say what you want it to",
    options: [
      {
        name: "message",
        description: "Enter your message",
        type: 3,
        required: true,
      },
    ],
  },
  /**
   *
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({
      content: "Message sent",
      flags: discord.MessageFlags.Ephemeral,
    });
    interaction.channel.send(interaction.options.data[0].value);
  },
};
