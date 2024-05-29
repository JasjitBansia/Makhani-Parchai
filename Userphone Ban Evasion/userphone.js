const { client, prefix } = require("../index.js");
const tokens = require("../tokens.json");
let sentUserphoneCmd = false;
let sentHangupCmd = false;
module.exports = {
  APIreq(channel, token, content) {
    fetch(`https://discord.com/api/v9/channels/${channel}/messages`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ content: content }),
    });
  },
  execute() {
    client.on("messageCreate", (message) => {
      if (
        message.guild.id === "790827946746314782" ||
        message.guild.id === "889175536780333136"
      ) {
        let tod = client.guilds.cache
          .find((g) => g.id === "889175536780333136")
          .channels.cache.find((c) => c.id === "889510308438241320");
        const todCollector = tod.createMessageCollector();

        const treeChannel = client.guilds.cache
          .find((g) => g.id === "790827946746314782")
          .channels.cache.find((c) => c.id === "1244989886507782224");
        const treeCollector = treeChannel.createMessageCollector();

        if (
          message.content.toLowerCase() === prefix + "userphone" &&
          sentUserphoneCmd === false
        ) {
          this.APIreq(
            "1244989886507782224",
            tokens.fortnitekritzie,
            "--userphone"
          );
          sentUserphoneCmd = true;
          sentHangupCmd = false;
          todCollector.on("collect", (message) => {
            if (message.author.id === "924943151301554186") {
              if (
                !message.content.startsWith("*") &&
                !message.content.startsWith("--")
              ) {
                this.APIreq(
                  "1244989886507782224",
                  tokens["code.known"],
                  message.content
                );
              }
            } else if (message.author.id === "539796772323590164") {
              if (
                !message.content.startsWith("*") &&
                !message.content.startsWith("--")
              ) {
                this.APIreq(
                  "1244989886507782224",
                  tokens.fortnitekritzie,
                  message.content
                );
              }
            }
          });
          treeCollector.on("collect", (message) => {
            if (message.author.id === "247283454440374274") {
              if (message.content.includes("#0000")) {
                const arr = message.content.split(" ");
                arr.shift();
                arr.shift();
                tod.send(
                  `${message.content.split(" ")[0]}` +
                    " <:userphone:1245019553252114554> " +
                    `${arr.join(" ")}`
                );
              } else {
                tod.send(`Userphone: ${message}`);
              }
              if (
                message.content.includes("hung") ||
                message.content.includes("overload") ||
                message.content.includes("has been lost") ||
                message.content.includes("cooldown")
              ) {
                sentUserphoneCmd = false;
                sentHangupCmd = true;
                todCollector.stop();
                treeCollector.stop();
              }
            }
          });
        }

        if (
          message.content.toLowerCase() === prefix + "hangup" &&
          sentHangupCmd === false
        ) {
          this.APIreq(
            "1244989886507782224",
            tokens.fortnitekritzie,
            "--hangup"
          );
          sentHangupCmd = true;
        }
      }
    });
  },
};
