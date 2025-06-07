const discord = require("discord.js");
module.exports = {
  command: {
    name: "slur",
    description: "Hard M",
  },
  /**
   * @param {discord.Message} message
   */
  execute(message) {
    if (message.guild.id === "889175536780333136") {
      let array = ["meow", "grrr", "dhruv"];
      let text = "";
      let length = Math.round(
        Math.random() * (array.length * 3 - array.length) + array.length
      );
      for (let i = 1; i <= length; i++) {
        let value = array[Math.floor(Math.random() * array.length)];
        text += value + " ";
      }
      message.channel.send({
        content: text,
        files:
          Math.random() < 0.1
            ? [{ attachment: "./assets/meow.mp3", name: "meow.mp3" }]
            : [],
      });
    }
  },
};
