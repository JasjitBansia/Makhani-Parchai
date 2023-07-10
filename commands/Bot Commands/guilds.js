module.exports = {
    command: { name: "guilds", description: "Bot's guild list" },
   async execute(interaction, client) {
        if (interaction.user.id === "740131838844207164") {
            let text = ""
            let index = 0
          await client.guilds.cache.forEach((guild) => {
                index++
                text += `**${index}.** ${guild.name}\n`
            })
            interaction.reply(text)
        }
        else {
            interaction.reply({ content: "Restricted command", ephemeral: true })
        }
    }
}