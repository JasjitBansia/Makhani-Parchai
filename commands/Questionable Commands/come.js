module.exports = {
  command: {
    name: "come",
    description: "Summon a member",
    options: [
      {
        name: "user",
        description: "Mention the user",
        type: 6,
        required: true,
      },
      {
        name: "limit",
        description: "Number of time the bot will ping the user (max 20)",
        type: 4,
        required: true,
      },
      {
        name: "enlarge",
        description: "Enlarge the text",
        type: 5,
        required: false,
      },
    ],
  },
  execute(interaction) {
    let user = `<@${interaction.options.data[0].user.id}>`;
    let numberOfPings = interaction.options.data[1].value;

    let sendText = (parameter) => {
      interaction.channel.send(`${parameter} Cum here ${user}`);
    };

    if (numberOfPings <= 20) {
      interaction.reply(`Pinging...`);

      for (let i = 1; i <= numberOfPings; i++) {
        if (
          interaction.options.data[2] &&
          interaction.options.data[2].value === true
        ) {
          sendText("#");
        } else {
          sendText("");
        }
      }
    } else {
      interaction.reply("The limit of pings is 20.");
    }
  },
};
