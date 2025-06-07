const { categories, prefix } = require("../../index.js");
const discord = require("discord.js");
const fs = require("fs");
let path = require("path");
module.exports = {
  command: {
    name: "commandlist",
    description: "Displays all the commands of the bot",
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    let text = "# Slash Commands:\n";
    let messageCommandPath = path.join(
      __dirname,
      "..",
      "..",
      "/Message Commands"
    );
    for (category of categories) {
      let commandFiles = fs
        .readdirSync(`./commands/${category}`)
        .filter((file) => file.endsWith(".js"));
      text += `### ${category}:\n`;
      for (file of commandFiles) {
        let command = require(`../${category}/${file}`);
        text += `**/${command.command.name}**: ${command.command.description}\n`;
      }
    }
    text += "\n# Message Commands:\n";
    fs.readdirSync(messageCommandPath)
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        let command = require(`${messageCommandPath}/${file}`);
        text += `\n** ${prefix}${command.command.name}**: ${command.command.description}\n`;
      });

    let embed = new discord.EmbedBuilder()
      .setTitle("Commands")
      .setColor("Green")
      .setDescription(text);
    interaction.reply({ embeds: [embed] });
  },
};
