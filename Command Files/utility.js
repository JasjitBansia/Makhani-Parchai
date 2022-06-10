module.exports = {
  name: "Commands to make your life easier",
  cooldown: 5,
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} message
   * @param {import("discord.js")} Discord
   */
  execute(Discord, client, prefix) {
    client.on("messageCreate", (message) => {
      let args = message.content.trim().split(/ +/);
      let command = args.shift().toLowerCase();
      let PingedUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (command === prefix + "nick") {
        if (message.member.id === "878233248470282250") {
          message.reply("Ok no");
        } else {
          if (!PingedUser) {
            if (args[0] !== undefined) {
              let arr = [...args.slice(0).join(" ")];
              if (arr.length <= 32) {
                if (message.member.manageable === true) {
                  message.channel.send(
                    `Changed your name to **${args.slice(0).join(" ")}**`
                  );
                  message.member.setNickname(args.slice(0).join(" "));
                } else {
                  message.channel.send(
                    "Couldn't change your nickname, you are too powerful :pensive:"
                  );
                }
              } else {
                message.channel.send(
                  "Nickname cannot be more than 32 characters."
                );
              }
            } else {
              message.reply("Provide a name NAMELESS");
            }
          } else {
            if (message.member.permissions.has("MANAGE_NICKNAMES")) {
              let arr = [...args.slice(1).join(" ")];
              if (args[1] === undefined) {
                if (args[0] !== undefined) {
                  message.reply("You need to provide a nickname.");
                }
              } else {
                if (PingedUser.manageable === true) {
                  if (arr.length <= 32) {
                    message.channel.send(
                      `Changed **${PingedUser.nickname}**'s name to **${args
                        .slice(1)
                        .join(" ")}**`
                    );
                    PingedUser.setNickname(args.slice(1).join(" "));
                  } else {
                    message.channel.send(
                      "Nickname cannot be more than 32 characters."
                    );
                  }
                } else {
                  message.channel.send(
                    `Couldn't change the nickname of **${PingedUser.nickname}**`
                  );
                }
              }
            } else {
              message.channel.send(`You don't have the permission to do that.`);
            }
          }
        }
      } else if (
        command === prefix + "everyonebecome" &&
        args[0] !== undefined
      ) {
        if (
          message.member.permissions.has("MANAGE_NICKNAMES") ||
          message.member.id === message.guild.ownerId
        ) {
          let arr = [...args.slice(0).join(" ")];
          if (arr.length <= 32) {
            message.guild.members.cache.forEach((m) => {
              if (m.manageable === true) {
                m.setNickname(args.slice(0).join(" "));
              } else {
                return;
              }
            });
          } else {
            message.channel.send(
              "Nickname should be less than or of 32 characters."
            );
          }
        } else {
          message.reply("You don't have the permission to do that");
        }
      } else if (command === prefix + "ui") {
        if (args[0] !== undefined) {
          if (!isNaN(args[0])) {
            let amount = args[0] * 77.32;
            amount = amount.toFixed(2);
            message.channel.send(`**${args[0]}** USD = **${amount}** INR`);
          } else {
            message.reply(`**${args[0]} doesn't look like a number to me**`);
          }
        } else {
          message.reply(`Provide a number`);
        }
      } else if (command === prefix + "iu") {
        if (args[0] !== undefined) {
          if (!isNaN(args[0])) {
            let amount = args[0] / 77.32;
            amount = amount.toFixed(2);
            message.channel.send(`**${args[0]}** INR = **${amount}** USD`);
          } else {
            message.reply(`**${args[0]} doesn't look like a number to me**`);
          }
        } else {
          message.reply(`Provide a number`);
        }
      } else if (command === prefix + "randnum") {
        if (args[0] === undefined) {
          message.channel.send(`Take **${Math.floor(Math.random() * 11)}**`);
        } else {
          if (args[1] === undefined) {
            if (!isNaN(args[1])) {
              message.reply("Provide an end point");
            } else {
              message.reply(
                'PROVIDE ME NUMBERS DO YOU NOT GET IT\'S LITERALLY IN THE NAME RANDNUM"NUM" IS NUMBER SMH'
              );
            }
          } else {
            if (!isNaN(args[0]) && !isNaN(args[1])) {
              let arr = [];
              for (let i = args[0]; i <= args[1]; i++) {
                arr.push(i);
              }
              message.channel.send(
                `Take **${arr[Math.floor(Math.random() * arr.length)]}**`
              );
            } else {
              message.reply(
                'PROVIDE ME NUMBERS DO YOU NOT GET IT\'S LITERALLY IN THE NAME RANDNUM"NUM" IS NUMBER SMH'
              );
            }
          }
        }
      }
    });
  },
};
