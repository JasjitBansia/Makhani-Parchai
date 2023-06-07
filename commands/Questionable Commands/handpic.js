const tokens = require("C:/Users/HP/Desktop/Code/Makhani Parchai/tokens.json");
const { EmbedBuilder } = require("discord.js");
const { createClient } = require("pexels");
const imageClient = createClient(`${tokens.images}`);
module.exports = {
  command: {
    name: "handpic",
    description: "Random hand pictures hm² wants for some reason",
  },
  async execute(interaction) {
    try {
      let file = await imageClient.photos.search({
        query: "hands",
        per_page: 80,
        page: Math.floor(Math.random() * 100),
      });
      let arrayOfImages = await file.photos;
      let randomImage =
        arrayOfImages[Math.floor(Math.random() * arrayOfImages.length)];
      let embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Hand Picture")
        .setImage(`${randomImage.src.original}`)
        .setFooter({ text: `Image by ${randomImage.photographer}` });
      interaction.reply({ embeds: [embed] });
    } catch {
      interaction.reply("An error occurred.");
    }
  },
};
