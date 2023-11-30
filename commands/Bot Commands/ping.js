const { client } = require("C:/Users/HP/Desktop/Code/Makhani Parchai/index.js");
const discord = require("discord.js");
module.exports = {
  command: { name: "ping", description: "Bot latency" },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply(`The ping is of **${client.ws.ping}**ms`);
  },
};
