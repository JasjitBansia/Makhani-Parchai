const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
module.exports = {
  command: {
    name: "wipeout",
    description: "Assert dominance",
  },
  chatInputCommand(interaction) {
    if (interaction.user.id === interaction.guild.ownerId) {
      let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("Accept")
          .setEmoji("<:success:1099020729447620640>")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("Reject")
          .setEmoji("<:false:1099021630052769933>")
          .setStyle(ButtonStyle.Danger)
      );
      let confirmationEmbed = new EmbedBuilder()
        .setTitle("Confirmation")
        .setDescription("Kick everyone possible <:sheesh:1061326601016578078>")
        .setColor("Red");
      interaction.reply({ embeds: [confirmationEmbed], components: [row] });
    } else {
      interaction.reply(
        "You cannot use this command since you are not the owner."
      );
    }
  },
  buttonCommand(interaction) {
    if (interaction.user.id === interaction.guild.ownerId) {
      if (interaction.customId === "Reject") {
        interaction.update({
          content: "Kicking aborted",
          components: [],
          embeds: [],
        });
      } else if (interaction.customId === "Accept") {
        let confirmationEmbed = new EmbedBuilder()
          .setTitle("Another confirmation")
          .setDescription("Type `yes` for kicking and `no` for aborting")
          .setColor("Red");
        interaction.update({ embeds: [confirmationEmbed], components: [] });
        let filter = (m) => m.author.id === interaction.guild.ownerId;
        let collector = interaction.channel.createMessageCollector({
          filter,
          time: 10000,
          max: 1,
        });
        collector.on("collect", (collected) => {
          if (collected.content === "yes") {
            interaction.guild.members.cache.forEach((member) => {
              if (member.kickable === true) {
                member.kick();
                interaction.channel.send(`Kicked ${member.user.tag}`);
              } else {
                return null;
              }
            });
          }
          if (collected.content === "no") {
            interaction.followUp("Kicking aborted");
          }
        });
      }
    } else {
      interaction.reply({
        content: "You cannot use this command since you are not the owner.",
        ephemeral: true,
      });
    }
  },
};
