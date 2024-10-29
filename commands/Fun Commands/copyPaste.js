const discord = require("discord.js");
module.exports = {
  command: {
    name: "copy-paste",
    description: "Mass sends a message",
    options: [
      {
        name: "word",
        description: "Specifiy the word",
        type: 3,
        required: true,
      },
      {
        name: "send-count",
        description: "Number of times it will copy paste",
        type: 4,
        required: true,
      },
      {
        name: "commas",
        description: "Use commas to separate the word/sentence",
        type: 5,
        required: false,
      },
    ],
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    let word = interaction.options.data[0].value;
    let count = interaction.options.data[1].value;
    let commas = interaction.options.data[2];
    let text = "";
    for (let i = 1; i <= count; i++) {
      if (commas) {
        if (commas.value === false) {
          text += word + " ";
        } else {
          text += word + ", ";
        }
      } else {
        text += word + " ";
      }
    }

    if (text.length <= 2000) {
      if (text.charAt(text.length - 2) === ",") {
        text = text.slice(0, text.length - 2);
        interaction.reply(text);
      } else {
        interaction.reply(text);
      }
    } else {
      text = text.substring(0, 2000);
      console.log(text.length);
      interaction.reply(text);
    }
  },
};
