const client = require("C:/Users/HP/Desktop/Code/Makhani Parchai/index.js");
module.exports = {
  command: { name: "ping", description: "Bot latency" },
  execute(interaction) {
    interaction.reply(`The ping is of **${client.ws.ping}**ms`);
  },
};
