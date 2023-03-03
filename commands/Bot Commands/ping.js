module.exports = {
  command: { name: "ping", description: "Bot latency" },
  execute(interaction, client) {
    interaction.reply(`The ping is of **${client.ws.ping}**ms`);
  },
};
