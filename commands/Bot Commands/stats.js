const discord = require("discord.js");
const systeminformation = require("systeminformation");
const package = require("../../package.json");
const fs = require("fs");
const { categories, client } = require("../../index.js");
let numberOfCommands = 0;
for (category of categories) {
  let commandFiles = fs
    .readdirSync(`./commands/${category}`)
    .filter((file) => file.endsWith(".js"));
  for (file of commandFiles) {
    numberOfCommands++;
  }
}
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
  command: { name: "stats", description: "Displays bot stats" },
  /**
   *
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let handledSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let handledMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let handledHours = hours < 10 ? `0${hours}` : hours;

    await interaction.deferReply();
    let cpu = await systeminformation.cpu();
    let cpuFreq = await systeminformation.cpuCurrentSpeed();
    let cpuTemp = await systeminformation.cpuTemperature();
    let cpuLoad = await systeminformation.currentLoad();
    let mem = await systeminformation.mem();
    let embed = new discord.EmbedBuilder()
      .setTitle("Statistics")
      .setDescription(
        `### **Bot Info**\n**Uptime**: ${handledHours}:${handledMinutes}:${handledSeconds}\n**Total commands**: ${numberOfCommands}\n**Registered on**: ${client.user.createdAt.toLocaleDateString()}\n**Guild count**: ${
          client.guilds.cache.size
        }\n**Discord.js version**: ${package.dependencies[
          "discord.js"
        ].substring(1)}\n### **Hardware Info**\n**CPU frequency**: ${
          cpuFreq.avg
        }Ghz\n**CPU cores**: ${cpu.physicalCores}\n**CPU architecture**: ${
          cpu.vendor
        }\n**CPU load**: ${cpuLoad.currentLoad.toFixed(
          1
        )}%\n**CPU temperature**: ${cpuTemp.main.toFixed(
          1
        )}°C\n**Total RAM**: ${(mem.total / 1000000000).toFixed(
          1
        )}GB\n**RAM in use**: ${(mem.used / 1000000000).toFixed(1)}GB (${(
          (mem.used / mem.total) *
          100
        ).toFixed(0)}%)
`
      )
      .setColor("Green");
    await interaction.editReply({ embeds: [embed] });
  },
};
