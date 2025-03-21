const express = require("express");
const tokens = require("../tokens.json");
const port = 4500;
const {
  Client,
  WebhookClient,
  EmbedBuilder,
  GatewayIntentBits,
} = require("discord.js");
const app = express();
app.use(express.json());
const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
  ],
});
client.on("ready", () => {
  console.log("Bot is ready");
});
const webhookClient = new WebhookClient({
  url: tokens.webhookURL,
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/status", (req, res) => {
  res.status(200).send("Server is running");
});
app.post("/github-webhook", async (req, res) => {
  let commitMessage;
  let important = false;
  let data = req.body;
  if (data.head_commit.message.toLowerCase().endsWith("-i")) {
    commitMessage = data.head_commit.message.substring(
      0,
      data.head_commit.message.length - 2
    );
    important = true;
  } else {
    commitMessage = data.head_commit.message;
  }
  let user = await client.users.fetch("764047181228408873");
  const embed = new EmbedBuilder()
    .setTitle("Makhani Parchai-New Commit")
    .setColor("Green")
    .setThumbnail(user.displayAvatarURL())
    .setDescription(commitMessage + " -" + data.head_commit.committer.username);

  webhookClient.send({
    content: important ? "@everyone" : "Minor Commit",
    username: "Makhani-Parchai",
    avatarURL: user.displayAvatarURL(),
    embeds: [embed],
  });
  res.status(200);
});
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
client.login(tokens.webhookBot);
