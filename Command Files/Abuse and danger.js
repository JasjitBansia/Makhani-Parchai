
module.exports = {
  name: "danger",
  cooldown: 5,
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} message
   * @param {import("discord.js")} Discord
   */

  execute(Discord, client, prefix) {
    client.on("messageCreate", (message) => {
      let num = 0;
      let args = message.content.trim().split(/ +/);
      let command = args.shift().toLowerCase();
      let pingedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (command === prefix + "spamping") {
        message.delete();
        clearPing = setInterval(() => {
          num++;
          let msg = message.channel.send("@everyone");
          msg.then((ping) => {
            ping.delete({ timeout: 1500 });
          });
          if (num === 10) {
            clearInterval(clearPing);
          }
        }, 3000);
      }
      else if (
        command === prefix + "wipeout" &&
        message.member.id === message.guild.ownerId
      ) {
        let banconfirmationMessage = new Discord.MessageEmbed()
          .setTitle('BE CAREFUL')
          .setDescription(
            "Annoyed by the members? Kick them all at once :)",
          )
          .setColor('RED');
        message.channel.send({ embeds: [banconfirmationMessage] }).then((msg) => {
          msg.react('✅');
          msg.react('❌');

          let filter = (reaction, user) => {
            return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id;
          };
          let collector = msg.createReactionCollector({ filter, time: 15000, max: 1 });
          collector.on('collect', (reaction) => {
            if (reaction.emoji.name === '✅') {
              message.guild.members.cache.forEach(((member) => {
                if (member.kickable == true) {
                  member.kick().then(() => {
                    message.channel.send(`Kicked **${member.user.tag}**`);
                  })
                }
              }));
            }
          });
          collector.on('collect', (reaction) => {
            if (reaction.emoji.name === '❌') {
              message.channel.send("Glad that you have chosen peace!")
            }
          });
        })
      }
      else if (command === prefix + "wipeout" && message.member.id !== message.guild.ownerId) {
        message.reply("Don't even try... Only owner of the server can use this command")
      }
      if (command === prefix + "come" && pingedUser && !pingedUser.user.bot) {
        if(message.member.id !== "878233248470282250"){
        let summonCount = 0
        clear = setInterval(() => {
          summonCount++
          message.channel.send(`<@${pingedUser.id}> Come hereee`);   
          if(summonCount === 5){
            clearInterval(clear);
          }   
        }, 1500);
        setTimeout(() => {
          message.channel.send("Hopefully they came by now")
        }, 10000);
        }
        else{
        message.channel.send("NO YOU CAN'T DESPERATE SOUL FORCING PEOPLE TO COME")}
      }

      else if (command === prefix + "come" && !pingedUser) {
        message.reply("Ping a user that you want to summon")
      }
      else if(command === prefix + "hao"){
        message.channel.send("HAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJFHAOKSDFLASKJDFLAKSJDFLKASJDLFKAJSLDKFJASDFAISDFHAOSIDFJAOSDJF")
      }
    });
  },
};

