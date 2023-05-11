module.exports = {
  command: {
    name: "everyoneping",
    description: "Ping everyone a number of times",
    options: [
      {
        name: "limit",
        description: "The number of times it will ping",
        type: 4,
        required: true,
      },
    ],
  },
  execute(interaction) {
    let allowedUsers = [
      719573984873676860, 924943151301554186, 539796772323590164,
      767895236063658004, 740131838844207164,
    ];
    let numberOfPings = interaction.options.data[0].value;
    if (allowedUsers.includes(Number(interaction.member.id))) {
      if (numberOfPings <= 20) {
        interaction.reply("Pinging...");
        for (let i = 1; i <= numberOfPings; i++) {
          interaction.channel.send(`@everyone`);
        }
      } else {
        interaction.reply("The limit of pings is 20.");
      }
    } else {
      interaction.reply("You cannot execute this command.");
    }
  },
};
