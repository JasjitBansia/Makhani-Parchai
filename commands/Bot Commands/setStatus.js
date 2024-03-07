const discord = require("discord.js");
const { client } = require("../../index.js");
module.exports = {
  command: {
    name: "set-status",
    description: "Set status of the bot",
    options: [
      {
        name: "status",
        description: "Provide the status",
        type: 3,
        required: true,
        choices: [
          { name: "Online", value: "online" },
          { name: "Do not Disturb", value: "dnd" },
          { name: "Idle", value: "idle" },
          { name: "Invisible", value: "invisible" },
        ],
      },
    ],
  },
  /**
   *
   * @param {discord.ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    let status = interaction.options.data[0].value;
    switch (status) {
      case "online": {
        this.setStatus(interaction, "online");
        break;
      }
      case "dnd": {
        this.setStatus(interaction, "dnd");
        break;
      }
      case "idle": {
        this.setStatus(interaction, "idle");
        break;
      }
      case "invisible": {
        this.setStatus(interaction, "invisible");
      }
    }
  },
  setStatus(interaction, status) {
    client.user.setStatus(status);
    interaction.reply(
      `Bot status set to ${status}. The change will be seen shortly`
    );
  },
};
