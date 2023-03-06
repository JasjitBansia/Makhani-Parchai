const tokens = require(`C:/Users/hello/OneDrive/Desktop/Code/Makhani Parchai/tokens.json`);
const { EmbedBuilder } = require("discord.js");
module.exports = {
  command: {
    name: "weather",
    description: "Shows the current weather of a place",
    options: [
      {
        name: "place",
        description: "Name of the place you want to see weather of",
        type: 3,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    try {
      let place = Array.from(interaction.options.data[0].value).join("");
      let geoCode = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${place.toString()}&limit=1&appid=${
          tokens.weather
        }`
      );
      let geoCodeData = await geoCode.json();
      lat = geoCodeData[0].lat;
      lon = geoCodeData[0].lon;
      let weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${tokens.weather}&units=metric`
      );
      let weatherData = await weather.json();
      let weatherEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(
          `${
            [...place].shift().toUpperCase() +
            [...place].slice(1, place.length).join("")
          }`.toString()
        )
        .setDescription(
          `\n\n**Weather Information** \n\nTemperature: **${weatherData.main.feels_like}**°C \nDescription: **${weatherData.weather[0].main}** \nHumidity: **${weatherData.main.humidity}%** \nWind: **${weatherData.wind.speed} km/h** \n\n**Locality** \n\nName:**${weatherData.name}** \nCountry: **${weatherData.sys.country}** \nLatitude: **${weatherData.coord.lat}** \nLongitude: **${weatherData.coord.lon}**`
        );
      interaction.reply({ embeds: [weatherEmbed] });
    } catch {
      interaction.reply("An error occurred while fetching the information.");
    }
  },
};
