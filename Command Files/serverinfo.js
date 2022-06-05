module.exports = {
  name: "server commands",
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} message
   * @param {import("discord.js")} Discord
   */
  execute(Discord, client, prefix) {
    client.on("messageCreate", (message) => {
      let server = message.guild;
      let serverName = server.name;
      let uppered = serverName[0].toUpperCase();
      let rest = serverName.slice(1);
      let command = message.content.toLowerCase();
      if (command === prefix + "server") {
        let Server = new Discord.MessageEmbed()
          .setTitle("**" + uppered + rest + "**")
          .setColor("BLUE")
          .setThumbnail(server.iconURL())
          .setDescription(
            "Members: " +
            "**" +
            server.memberCount +
            "**" +
            "\n\nHumans: " +
            "**" +
            server.members.cache.filter((m) => !m.user.bot).size +
            "**" +
            "\n\nBots: " +
            "**" +
            server.members.cache.filter((m) => m.user.bot).size +
            "**" +
            "\n\nDate Created: " +
            "**" +
            server.createdAt.toDateString() +
            "**" +
            "\n\nOwner: " +
            "<@" +
            server.ownerId +
            ">" +
            "\n\nCategories: " + "**" + server.channels.cache.filter((category) => category.type === "GUILD_CATEGORY").size + "**" +
            "\n\nText: " + "**" + server.channels.cache.filter((category) => category.type === "GUILD_TEXT").size + "**" +
            "\n\nVc's: " + "**" + server.channels.cache.filter((category) => category.type === "GUILD_VOICE").size + "**" +
            "\n\nNumber of roles: " +
            "**" +
            server.roles.cache.size +
            "**" +
            "\n\nRoles: " +
            "**" +
            server.roles.cache.map((role) => role.name).join(", ") +
            "**" +
            "\n\nEmojis: " +
            server.emojis.cache.map((emoji) => emoji.toString()).join(", ") +
            " (" +
            server.emojis.cache.size +
            " of them)"

          );
        message.channel.send({ embeds: [Server] });
      }
      else if (command === prefix + "peoplewhoshouldnotbemessedwith.ifmessedwiththendeath") {
        let arr = []
        let ppl = message.guild.members.cache.filter((m) => m.permissions.has("BAN_MEMBERS") && m.user.bot === false).map((m) => `**${m.displayName}**`).join("\n")
        arr.push(ppl)
        let emb = new Discord.MessageEmbed()
        .setTitle("Beware of: \n")
        .setDescription(arr.toString())
        .setColor("RED")
        .setThumbnail("https://i.imgur.com/SWcPqLU.gif")
        message.channel.send({ embeds: [emb] })
      }
      else if(command === prefix + "members"){
        let emb = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle("Member Count")
        .setDescription(`Total Members: **${message.guild.memberCount}** \nHumans: **${message.guild.members.cache.filter((m) => !m.user.bot).size}** \nBots: **${message.guild.members.cache.filter((m) => m.user.bot).size}**`)
        message.channel.send({embeds: [emb]})
      }
    });
  },
};
