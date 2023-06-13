module.exports = {
  command: {
    name: "say",
    description: "Make the bot say what you want it to",
    options: [
      {
        name: "message",
        description: "Enter your message",
        type: 3,
        required: true,
      },
    ],
  },
  execute(interaction) {
    interaction.reply({content: "Message sent", ephemeral: true})
    interaction.channel.send(interaction.options.data[0].value);
  },
};
