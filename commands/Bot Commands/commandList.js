const {
  categories,
} = require("C:/Users/HP/Desktop/Code/Makhani Parchai/index.js");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
module.exports = {
  command: {
    name: "commandlist",
    description: "Displays all the commands of the bot",
  },
  execute(interaction) {
    let text = "";
    for (category of categories) {
      let commandFiles = fs
        .readdirSync(`./commands/${category}`)
        .filter((file) => file.endsWith(".js"));
      text += `# ${category}:\n`;
      for (file of commandFiles) {
        let command = require(`../${category}/${file}`);
        text += `**/${command.command.name}**: ${command.command.description}\n`;
      }
    }
    let embed = new EmbedBuilder()
      .setTitle("Commands")
      .setColor("Green")
      .setDescription(text);
    interaction.reply({ embeds: [embed] });
  },
};
