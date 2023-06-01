module.exports = {
  command: {
    name: "choose",
    description: "Let the bot take decisions for you (yes or no)",
  },
  execute(interaction) {
    let arr = ["Yes", "No"];
    interaction.reply(`**${arr[Math.floor(Math.random() * arr.length)]}**`);
  },
};
