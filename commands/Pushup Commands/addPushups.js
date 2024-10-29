const discord = require("discord.js");
const { mongoClient } = require("../../index.js");
const { returnInfo } = require("./getPushupInfo.js");
let db = mongoClient.db("Pushups").collection("data");
module.exports = {
  command: {
    name: "add-pushups",
    description: "Add pushups in your record",
    options: [
      {
        name: "pushups",
        description: "Number of pushups",
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
    if (userObj !== null) {
      let numberOfPushups = interaction.options.data[0].value;
      await db.updateOne(
        { userID: interaction.user.id },
        { $inc: { pushupsDone: numberOfPushups } }
      );
      let embed = new discord.EmbedBuilder()
        .setDescription(`Added **${numberOfPushups}** pushups to your record`)
        .setColor("Green");
      interaction.reply({
        embeds: [embed, await returnInfo(interaction.user.id)],
      });
    } else {
      let embed = new discord.EmbedBuilder()
        .setDescription(
          "You have not registered. Use the `/register-challenge` command to do so"
        )
        .setColor("Green");
      interaction.reply({ embeds: [embed] });
    }
  },
};
