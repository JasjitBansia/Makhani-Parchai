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
    ],
  },
  execute(interaction) {
    if (interaction.commandName === "come") {
      let user = `<@${interaction.options.data[0].user.id}>`;
      let numberOfPings = interaction.options.data[1].value - 1;
      if (numberOfPings < 20) {
        interaction.reply(`Cum here ${user}`);
        for (let i = 1; i <= numberOfPings; i++) {
          interaction.channel.send(`Cum here ${user}`);
        }
      } else {
        interaction.reply("The limit of pings is 20.");
      }
    }
  },
};
