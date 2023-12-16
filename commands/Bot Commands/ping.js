const { client } = require("../../index.js");
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
