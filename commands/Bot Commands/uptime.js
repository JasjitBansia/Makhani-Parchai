const discord = require("discord.js");
let [seconds, minutes, hours] = [0, 0, 0];
setInterval(() => {
  seconds++;
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }
  if (minutes > 59) {
    hours++;
    minutes = 0;
  }
}, 1000);
module.exports = {
  command: { name: "uptime", description: "Shows the uptime of the bot" },
  /**
   *
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    let handledSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let handledMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let handledHours = hours < 10 ? `0${hours}` : hours;
    let embed = new discord.EmbedBuilder()
      .setTitle("Uptime")
      .setDescription(
        `**${handledHours}** hours **${handledMinutes}** minutes **${handledSeconds}** seconds`
      )
      .setColor("Green");
    interaction.reply({ embeds: [embed] });
  },
};
