module.exports = {
  name: "bot infofmation",
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} message
   * @param {import("discord.js")} Discord
   */
  execute(Discord, client, prefix) {
    client.on("messageCreate", (message) => {
      let args = message.content.trim().split(/ +/);
      let command = args.shift().toLowerCase();
      if (command === prefix + "ping") {
        message.channel.send("Pinging...").then((latency) => {
          latency.edit(
            "The delay is of " +
              "**" +
              `${latency.createdTimestamp - message.createdTimestamp}` +
              "ms" +
              "**"
          );
        });
      } else if (command === prefix + "botstatus") {
        if (args[0] !== undefined) {
          message.guild.members.client.user.setActivity(
            args.slice(0).join(" ")
          );
          message.channel.send(
            "Changed status to **" + args.slice(0).join(" ") + "**"
          );
        } else {
          message.reply("Provide status");
        }
      } else if (command === prefix + "be") {
        if (args[0] !== undefined) {
          let arr = [...args.slice(0).join(" ")];
          if (arr.length <= 32) {
            message.guild.members.cache.forEach((m) => {
              if (m.id === "764047181228408873") {
                m.setNickname(args.slice(0).join(" "));
                message.channel.send(`Hiii I'm ${args.slice(0).join(" ")}!`)
              }
            });
          } else {
            message.channel.send(
              "Nickname is too long. It should be less than or of 32 characters ||imagine using discord and not knowing that||"
            );
          }
        }
        else{
          message.reply("You want me to be nothingness?")
        }
      }
      else if(command === prefix + "repo"){
        message.channel.send(`Here's the github repo - https://github.com/JasjitBansia/Makhani-Parchai`)
      }
    });
  },
};
