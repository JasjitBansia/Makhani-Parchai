const discord = require("discord.js");
const { mongoClient } = require("../../index.js");
let db = mongoClient.db("Pushups").collection("data");
module.exports = {
  command: {
    name: "get-pushup-info",
    description: "Get tracking info about your pushup challenge",
  },
  async returnInfo(userID) {
    let userObj = await db.findOne({ userID: userID });
    let embed = new discord.EmbedBuilder()
      .setDescription(
        `**User**: <@${userObj.userID}>\n\n**Pushup goal**: ${
          userObj.pushupGoal
        }\n\n**Pushups done**: ${userObj.pushupsDone}\n\n**Progress**: ${
          userObj.pushupsDone
        }/${userObj.pushupGoal} (${(
          (userObj.pushupsDone / userObj.pushupGoal) *
          100
        ).toFixed(0)}%)\n\n**Time left**: ${(
          (new Date("1 January 2025").getTime() - Date.now()) /
          86400000
        ).toFixed(0)} days left
    `
      )
      .setColor("Green");
    return embed;
  },
  /**
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let userObj = await db.findOne({ userID: interaction.user.id });
    if (userObj !== null) {
      interaction.reply({
        embeds: [await this.returnInfo(interaction.user.id)],
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
