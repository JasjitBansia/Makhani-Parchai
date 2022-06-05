module.exports = {
  name: "bot related commands",
  cooldown: 5,
  /**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} message
 * @param {import("discord.js")} Discord
 */
  execute(Discord, prefix, client) {
    client.on("messageCreate", (message) => {
      let fs = require("fs");
      let suggestions = "./JSON Files/suggestions.json"
      let args = message.content.trim().split(/ +/);
      let command = args.shift().toLowerCase();
      if (command === prefix + "suggest" && args[0] !== undefined) {
        let suggestion = args.slice(0).join(" ")
        let suggestionEmbed = new Discord.MessageEmbed()
          .setTitle(`Suggestion by ${message.member.user.tag}`)
          .setDescription(`**${suggestion}**`)
          .setColor("GREEN")
            message.channel.send({ embeds: [suggestionEmbed] }).then(() => {
              let suggestionFile = JSON.parse(fs.readFileSync(suggestions, "utf8"));
              let index = suggestionFile.index++
              suggestionFile.suggestion.push(index + ". " + "**"+ suggestion + "**" + " - " + message.member.user.tag);
              fs.writeFileSync(suggestions, JSON.stringify(suggestionFile));

       
        })
      }
      else if (command === prefix + "suggest" && args[0] === undefined) {
        message.reply("Ty for your effort trying to suggest :) but it seems like you are doing it wrong. The correct way of using this command is `*suggest *your suggestion*`")
      }
      if (command === prefix + "suggestions") {
        let SuggestionEmbed = new Discord.MessageEmbed()
          .setTitle("Suggestions")
          .setDescription(`${JSON.parse(fs.readFileSync(suggestions, "utf8")).suggestion.join("\n")}`)
        message.channel.send({ embeds: [SuggestionEmbed] })
      }
      else if (command === prefix + "stfu") {
        message.channel.send("Bye bye :wave:").then(() => {
          throw new Error()
        })

      }
    });
  },
};
