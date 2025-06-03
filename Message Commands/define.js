const token = require("../tokens.json");
const discord = require("discord.js");
module.exports = {
  /**
   * @param {discord.Message} message
   */
  execute(message) {
    if (message.guild.id === "889175536780333136") {
      let json = {
        type: 2,
        application_id: "824268426679812118",
        guild_id: "889175536780333136",
        channel_id: token.defineChannelID,
        session_id: token.defineSessionID,
        data: {
          version: "1177625145133781002",
          id: "1007913462141309012",
          name: "define",
          type: 1,
          options: [
            {
              type: 3,
              name: "word",
              value: `${message.content.toString().split(" ")[1]}`,
            },
          ],
          application_command: {
            id: "1007913462141309012",
            type: 1,
            application_id: "824268426679812118",
            version: "1177625145133781002",
            name: "define",
            description: "Definition of a word",
            options: [
              {
                type: 3,
                name: "word",
                description: "…",
                required: true,
                description_localized: "…",
                name_localized: "word",
              },
            ],

            description_localized: "Definition of a word",
            name_localized: "define",
          },
          attachments: [],
        },
        analytics_location: "slash_ui",
      };
      try {
        fetch("https://discord.com/api/v9/interactions", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: token.alt,
          },
          body: JSON.stringify(json),
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
};
