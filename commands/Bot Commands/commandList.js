const { EmbedBuilder } = require("discord.js");
module.exports = {
  command: {
    name: "commandlist",
    description: "Lists all the commands of the bot",
  },
  execute(interaction, commands) {
    let commandList = "";
    for (let i = 0; i < commands.length; i++) {
      let cmds = `**/${commands[i].name}**: ${commands[i].description}`;
      commandList += `${cmds}\n\n`;
    }
    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Commands")
      .setDescription(commandList);
    interaction.reply({ embeds: [embed] });
  },
};
