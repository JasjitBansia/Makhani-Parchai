const discord = require("discord.js");
const Canvas = require("canvas");
const { MongoClient, client } = require("../index.js");
const db = MongoClient.db("Breaking-News");
let date = new Date().getDate();
setInterval(() => {
  date = new Date().getDate();
}, 21600000);
module.exports = {
  async execute() {
    let newsArray = await db.collection("news").findOne({});
    newsArray = newsArray.news;
    let canvas = Canvas.createCanvas(1920, 1080);
    let ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage(
      "https://i.ibb.co/7XMByvW/breaking-news-background.png"
    );
    let getGuilds = await db.collection("guilds").find({}).toArray();
    let guilds = getGuilds.map((guild) => {
      return guild;
    });
    guilds.forEach(async (guild) => {
      try {
        let channel = client.guilds.cache
          .find((g) => g.id === guild.guildID)
          .channels.cache.find(
            (channel) =>
              channel.name === "announcement" ||
              channel.name === "announcements"
          );
        if (channel) {
          if (date === 15 || date === 1) {
            async function send() {
              let totalNews = await db.collection("news").findOne();
              if (guild.usedUpIDs.length !== totalNews.news.length) {
                if (guild.enabled === true && guild.sent === false) {
                  let newsData =
                    newsArray[Math.floor(Math.random() * newsArray.length)];
                  if (!guild.usedUpIDs.includes(newsData.id)) {
                    ctx.drawImage(background, 0, 0);
                    ctx.fillStyle = "white";
                    ctx.font = "bold 80px Cursive";
                    ctx.textAlign = "center";
                    ctx.fillText(
                      newsData.news,
                      canvas.width / 2,
                      canvas.height / 1.8
                    );
                    ctx.fillStyle = "red";
                    ctx.font = "bold 150px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(
                      "⚠️BREAKING NEWS⚠️",
                      canvas.width / 2,
                      canvas.height / 4.5
                    );
                    let attachment = new discord.AttachmentBuilder(
                      canvas.toBuffer(),
                      "example.png"
                    );
                    await channel.send({
                      content: "@everyone @everyone DID YOU KNOW???",
                      files: [attachment],
                    });
                    db.collection("guilds").findOneAndUpdate(
                      { guildID: guild.guildID },
                      { $set: { sent: true } }
                    );
                    db.collection("guilds").findOneAndUpdate(
                      { guildID: guild.guildID },
                      { $push: { usedUpIDs: newsData.id } }
                    );
                  } else {
                    send();
                  }
                }
              }
            }
            send();
          } else {
            db.collection("guilds").findOneAndUpdate(
              { guildID: guild.guildID },
              { $set: { sent: false } }
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  },
};
