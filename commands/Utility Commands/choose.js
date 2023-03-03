module.exports = {
  command: {
    name: "choose",
    description: "Chooses a random value",
    options: [
      {
        name: "a",
        description: "First Value",
        type: 3,
        required: true,
      },
      {
        name: "b",
        description: "Second Value",
        type: 3,
        required: true,
      },
      {
        name: "c",
        description: "Third Value",
        type: 3,
        required: false,
      },
      {
        name: "d",
        description: "Fourth Value",
        type: 3,
        required: false,
      },
      {
        name: "e",
        description: "Fifth Value",
        type: 3,
        required: false,
      },
    ],
  },
  execute(interaction) {
    let arr = [];
    for (let i = 0; i < interaction.options.data.length; i++) {
      arr.push(interaction.options.data[i].value);
    }
    interaction.reply(
      `My choice will be **${arr[Math.floor(Math.random() * arr.length)]}**.`
    );
  },
};
