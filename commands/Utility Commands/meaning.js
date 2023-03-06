const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
module.exports = {
  command: {
    name: "meaning",
    description: "Look up the meaning of a word",
    options: [
      {
        name: "word",
        description: "Word to search the meaning for",
        type: 3,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    try {
      let word = interaction.options.data[0].value;
      let result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      let json = await result.json();
      let embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`${word}`)
        .setDescription(
          `Definition: ${
            json[0].meanings[0].definitions[0].definition
          } \n\nExample: ${
            json[0].meanings[0].definitions[0].example || "No example found."
          }`
        );
      await interaction.deferReply();
      await wait(5000);
      await interaction.editReply({ embeds: [embed] });
    } catch {
      interaction.reply("No definitions found.");
    }
  },
};
