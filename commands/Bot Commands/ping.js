const { client } = require("../../index.js");
const discord = require("discord.js");
module.exports = {
  command: { name: "ping", description: "Bot latency" },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let startTime = Date.now();
    await interaction.reply("Pinging...");
    let ping = Date.now() - startTime;
    interaction.editReply(`The ping is of **${ping.toString()}**ms`);
  },
};
