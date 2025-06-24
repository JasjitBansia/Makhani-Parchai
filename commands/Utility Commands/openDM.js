let discord = require("discord.js");
let { client } = require("../../index.js");
module.exports = {
  command: {
    name: "opendm",
    description: "Open DM of any user",
    options: [
      {
        name: "token",
        description: "Your discord token",
        type: 3,
        required: true,
      },
      {
        name: "user",
        description: "User to open DM with",
        type: 6,
        required: true,
      },
    ],
  },
  /**
   * @param {import("discord.js").CommandInteraction} interaction
   */
  execute: async (interaction) => {
    let token = interaction.options.data[0].value;
    let userId = interaction.options.data[1].value;
    let req = await fetch("https://discord.com/api/v9/users/@me/channels", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients: [userId],
      }),
    });
    if (req.status === 200) {
      let user = (await client.users.fetch(userId)).username;
      interaction.reply({
        content: `DM opened with **${user}**`,
        flags: discord.MessageFlags.Ephemeral,
      });
    } else {
      interaction.reply({
        content: "Failed to open DM",
        flags: discord.MessageFlags.Ephemeral,
      });
    }
  },
};
