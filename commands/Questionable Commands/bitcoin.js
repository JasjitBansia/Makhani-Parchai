const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  command: { name: "bitcoin", description: "Bitcoin" },
  chatInputCommand(interaction) {
    let row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Toss")
        .setCustomId("Toss")
        .setStyle(ButtonStyle.Primary)
    );
    let initialEmbed = new EmbedBuilder()
      .setImage("https://i.ibb.co/8jSW34f/Initial.jpg")
      .setColor("Green");

    interaction.reply({ embeds: [initialEmbed], components: [row] });
  },
  async buttonCommand(interaction) {
    if (interaction.customId === "Toss") {
      let images = {
        Head: "https://i.ibb.co/rwjg7WV/head.png",
        Tail: "https://i.ibb.co/mq6QC7d/tail.png",
      };
      let keys = Object.keys(images);
      let randomimage = keys[Math.floor(Math.random() * keys.length)];
      let embed = new EmbedBuilder()
        .setTitle(`It's ${randomimage}`)
        .setImage(`${images[randomimage]}`)
        .setColor("Green");
     await interaction.update({ embeds: [embed], components: [] });
      if (randomimage === "Head") {
        interaction.channel.send("https://i.ibb.co/2h6qRvJ/finalhead.jpg");
      } else {
        interaction.channel.send("https://i.ibb.co/NC2DqTW/finaltail.jpg");
      }
    }
  },
};
