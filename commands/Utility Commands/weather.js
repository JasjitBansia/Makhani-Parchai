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
          `\n\n **Weather Information**   
             \n Temperature: **${weatherData.main.feels_like}**°C ‎ ‎ ‎ ‎
             Description: **${weatherData.weather[0].main}**
             Humidity: **${weatherData.main.humidity}%** 
             Wind: **${weatherData.wind.speed} km/h**
             \n **Locality**
             \n Name: **${weatherData.name}**
             Country: **${weatherData.sys.country}**
             Latitude: **${weatherData.coord.lat}**
             Longitude: **${weatherData.coord.lon}**`
        )
        .setThumbnail(
          "https://o.remove.bg/downloads/af9f9988-9083-4d8e-89b2-492b8fd66736/vector-sun-icon-removebg-preview.png"
        );

      interaction.reply({ embeds: [weatherEmbed] });
    } catch {
      interaction.reply("An error occurred while fetching the information.");
    }
  },
};
