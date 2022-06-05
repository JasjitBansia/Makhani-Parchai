module.exports = {
  name: "commands for chaotic server",
  cooldown: 4,
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} message
   * @param {import("discord.js")} Discord
   */
  execute(Discord, client, prefix) {
    client.on("messageCreate", (message) => {
      let args = message.content.trim().split(/ +/);
     if(message.content.toLowerCase() === "wengiego" && !message.content.toLowerCase().startsWith(prefix) && message.member !== message.guild.members.cache.filter((m) => !m.user.bot)){
message.channel.send("WENGIE LEAVEE SMHH GO EAT ICE CREAM OR SMTH")}
    });


  },
};
