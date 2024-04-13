const discord = require("discord.js");
const { MongoClient } = require("../../index.js");
const db = MongoClient.db("Breaking-News");
module.exports = {
  command: {
    name: "set-breaking-news",
    description: "Breaking news every 15 days",
    options: [
      {
        name: "enabled",
        description: "Enable or disable breaking news",
        type: 5,
        required: true,
      },
    ],
  },
  /**
   *
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let state = interaction.options.data[0].value;
    let guild = await db
      .collection("guilds")
      .findOne({ guildID: interaction.guild.id });
    if (state) {
      if (!guild) {
        let channel = interaction.guild.channels.cache.find(
          (channel) =>
            channel.name === "announcement" || channel.name === "announcements"
        );
        if (channel) {
          db.collection("guilds").insertOne({
            guildID: interaction.guild.id,
            enabled: true,
            sent: false,
            usedUpIDs: [],
          });
          interaction.reply("Breaking news enabled in this guild");
        } else {
          interaction.reply("Announcements channel not found");
        }
      } else {
        let alreadyEnabled = guild.enabled;
        if (!alreadyEnabled) {
          await db
            .collection("guilds")
            .findOneAndUpdate(
              { guildID: interaction.guild.id },
              { $set: { enabled: true } }
            );
          interaction.reply("Breaking news enabled in this guild");
        } else {
          interaction.reply("Breaking news is already enabled in this guild");
        }
      }
    } else {
      if (guild) {
        await db
          .collection("guilds")
          .findOneAndUpdate(
            { guildID: interaction.guild.id },
            { $set: { enabled: false } }
          );
        interaction.reply("Breaking news disabled");
      } else {
        interaction.reply("Guild does not have breaking news set up");
      }
    }
  },
};
