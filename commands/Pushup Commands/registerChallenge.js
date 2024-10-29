const discord = require("discord.js");
const { mongoClient } = require("../../index.js");
let db = mongoClient.db("Pushups").collection("data");
const { returnInfo } = require("./getPushupInfo.js");

module.exports = {
  command: {
    name: "register-challenge",
    description: "Register for the pushup challenge",
    options: [
      {
        name: "goal",
        description: "Pushup goal",
        type: 4,
        required: true,
      },
    ],
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let userObj = await db.findOne({ userID: interaction.user.id });
    if (userObj === null) {
      let goal = interaction.options.data[0].value;
      await db.insertOne({
        userID: interaction.user.id,
        pushupGoal: goal,
        pushupsDone: 0,
      });
      let embed = new discord.EmbedBuilder()
        .setDescription("Registered")
        .setColor("Green");
      interaction.reply({
        embeds: [embed, await returnInfo(interaction.user.id)],
      });
    } else {
      let embed = new discord.EmbedBuilder()
        .setDescription("You have already registered")
        .setColor("Green");
      interaction.reply({ embeds: [embed] });
    }
  },
};
