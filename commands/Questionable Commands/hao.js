module.exports = {
  command: {
    name: "hao",
    description: "HAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDF",
    options: [
      {
        name: "enlarge",
        description: "Enlarge the text",
        type: 5,
        required: false,
      },
    ],
  },

  execute(interaction) {
    let sendHAO = (paramater) => {
      interaction.reply(
        `${paramater} HAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJF`
      );
    };
    if (
      interaction.options.data[0] &&
      interaction.options.data[0].value === true
    ) {
      sendHAO("#");
    } else {
      sendHAO("");
    }
  },
};
