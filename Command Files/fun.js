module.exports = {
  name: "fun commands",
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} message
   * @param {import("discord.js")} Discord
   * @param {import("discord.js").Permissions} permissions
   */
  execute(Discord, client, prefix) {
    let fs = require("fs");
    let jokes = [
      "My friend thinks he is smart. He told me an onion is the only food that makes you cry, so I threw a coconut at his face.",
      "I'm reading a book about anti-gravity, it's impossible to put down!",
      "What happens to a frog's car when it breaks down? It gets toad away.",
      "Why did the witches' team lose the baseball game? Their bats flew away.",
      "What do you call a dog that does magic tricks? A labracadabrador.",
      "Why did the scarecrow win an award? Because he was outstanding in his field.",
      "Why couldn't the leopard play hide and seek? Because he was always spotted.",
      "Why did the chicken cross the playground? To get to the other slide.",
      "What did the pirate say on his 80th birthday? Aye matey!",
      "Don't break anybody's heart; they only have 1. Break their bones; they have 206.",
      "Can February march? No, but April may.",
      "A man got hit in the head with a can of Coke, but he was alright because it was a soft drink.",
      "If the right side of the brain controls the left side of the body, then lefties are the only ones in their right mind.",
      "Why are vampires so easy to fool? Because they are suckers.",
      "What do you call a cow with no legs? Ground beef.",
      "The past, present, and future walked into a bar. It was tense.",
      "Dear Math, grow up and solve your own problems.",
      "What did the ocean say to the shore? Nothing, it just waved.",
      "I only know 25 letters of the alphabet. I don't know y.",
      "Where do fruits go on vacation? Pear-is!",
      "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
      "Where do boats go when they're sick? To the boat doc.",
      "Why don't eggs tell jokes? They'd crack each other up.",
      "Tanjeiyiyeiyeieeiyiyi. ||HA||",
      "I don't trust stairs. They're always up to something",
      "Why couldn't the bicycle stand up by itself? It was two tired.",
      "A magician was driving down the road... then he turned into a driveway.",
      "What's a race car's favorite thing to eat for lunch? Fast food!",
      "What did the astronaut say when he wanted to be alone? Give me some space!",
      "You. Admit it.",
      "What did the boy volcano say to the girl volcano? I lava you.",
      "Why is Snow White such a good judge? Because she is the fairest of them all.",
      "What does a cat like to eat with birthday cake? Mice cream!",
      "Why can't a nose be 12 inches long? Because then it would be a foot.",
      "What kind of car does an egg drive? A yolkswagen.",
      "What's brown and sticky? A stick.",
      "Why are piggy banks so wise? They're filled with common cents.",
      "Where do young trees go to learn? Elementree school.",
      "How do lawyers say goodbye? We'll be suing ya!",
      "What did the limestone say to the geologist? Don’t take me for granite",
      "What kind of tree fits in your hand? A palm tree.",
      "Why did the student eat his homework? Because the teacher told him it was a piece of cake.",
      "What do you say to a rabbit on its birthday? Hoppy Birthday.",
      "Why is the obtuse triangle always so frustrated? Because it’s never right.",
      "Why does nobody talk to circles? Because there’s no point.",
      "What did the banana say to the dog? Bananas can’t talk. ||duh||",
      "Why are fish so smart? Because they live in schools.",
      "What has 8 legs, 8 arms, and 8 eyes? 8 pirates.",
      "What is a cat’s favorite color? Purrr-ple.",
      "What did the cat say when he fell off the table? Me-ow.",
      "What is a monster’s favorite dessert? I scream.",
      "What did the fish say when he swam into the wall? Dam.",
      "What kind of photos do elves take? Elfies.",
      "What do you get when Santa becomes a detective? Santa clues.",
      "What kind of jewelry do rabbits wear? 14 carrot gold.",
      "Why are elevator jokes so classic and good? They work on many levels.",
      "Why do bees have sticky hair? Because they use a honeycomb.",
      "Why is Peter Pan always flying? Because he Neverlands.",
      "5/4 of people admit they’re bad at fractions.",
      "Why is cold water so insecure? Because it’s never called hot.",
      "What kind of car does a sheep like to drive? A lamborghini.",
      "Why are spiders so smart? They can find everything on the web.",
      "What does a house wear? Address.",
      "What’s red and smells like blue paint? Red paint. ||ofc what else||",
      "How do you weigh a millennial? In Instagrams.",
      "What do lions use to look at their manes? Mir*roars*.",
      "What vegetable is kind to everyone? The sweet potato.",
      "Why couldn’t the family leave the room after playing with Legos? They were blocked.",
      "What do dentists call their x-rays? Tooth pics!",
      "Why did the bullet end up losing his job? It got fired.",
      "How do you measure a snake? In inches. They don’t have feet.",
      "How does NASA organize a party? They planet.",
      "Why were they called the “dark ages?” Because there were a lot of knights.",
      "I tried to catch fog yesterday. Mist.",
      "Why won’t skeletons fight each other? They just don’t have the guts.",
      "What do you call a fly without wings? A walk!",
      "What do you call a fish with no eye? Fsh.",
      "Why did the coffee call the police? It got mugged!",
      `What did one wall say to the other? "Meet me at the corner!"`,
      "What kind of music do windmills like? They’re metal fans.",
    ];
    let killGIFS = [
      "https://c.tenor.com/0H3MsXseel0AAAAS/%D1%81%D0%BD%D0%B0%D0%B9%D0%BF%D0%B5%D1%80-sniper.gif",
      "https://c.tenor.com/bpUkzrcLRxEAAAAM/axe-axe-murderer.gif",
      "https://c.tenor.com/nKaQGrxrz48AAAAC/venom-lick.gif",
      "https://c.tenor.com/9jf-DDWOCI4AAAAS/runover-kid.gif",
      "https://c.tenor.com/CC-UdJRFfu8AAAAS/starship-troopers-starship.gif",
      "https://c.tenor.com/3oPWtHI7BCkAAAAS/headshot-soccer.gif",
      "https://c.tenor.com/jbtoSwOTpVEAAAAS/ahah-baseball.gif",
      "https://c.tenor.com/YmiE50LW_akAAAAS/pattseheadshot-pubg.gif",
      "https://c.tenor.com/XFn5Ghr4l8IAAAAS/cars-semi.gif",
    ];
    let cuddleGIFS = [
      "https://c.tenor.com/hsnYxyxQbRoAAAAM/hug-anime.gif",
      "https://c.tenor.com/sK9icjg3xm4AAAAM/strugglesnuggle-annoyed.gif",
      "https://c.tenor.com/got326PKNY4AAAAM/peachcat-cuddle.gif",
      "https://c.tenor.com/H7i6GIP-YBwAAAAM/a-whisker-away-hug.gif",
      "https://c.tenor.com/ItpTQW2UKPYAAAAS/cuddle-hug.gif",
      "https://c.tenor.com/aOQrkAJckyEAAAAM/cuddle-anime.gif",
    ];
    client.on("messageCreate", (message) => {
      let args = message.content.trim().split(/ +/);
      let command = args.shift().toLowerCase();
      let pingedUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (command === prefix + "hahajoke") {
        message.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
      } else if (command === prefix + "murder" && args.length >= 1) {
        let killEmbed = new Discord.MessageEmbed()
          .setTitle("Crimes")
          .setDescription(
            `**${
              message.member.displayName
            }** murdered, finished, vanished, destroyed, killed, annihilated, terminated, eleminated, assinated, assassinated, wiped out **${
              args[0]
            }** because **${args.slice(1).join(" ") || undefined}**
          `
          )
          .setImage(killGIFS[Math.floor(Math.random() * killGIFS.length)])
          .setColor("RED");
        message.channel.send({ embeds: [killEmbed] });
      } else if (command === prefix + "murder" && args.length === 0) {
        message.channel.send("No one was killed. Peace :)").then((msg) => {
          setTimeout(() => {
            msg.channel.send("JK EVERYONE WAS KILLED");
            msg.channel.send(`${prefix}murder @everyone`);
          }, 3000);
        });
      } else if (command === prefix + "cuddle" && args.length >= 1) {
        let cuddleEmbed = new Discord.MessageEmbed()
          .setTitle("Caring cuddles")
          .setDescription(
            `**${message.member.displayName}** is cuddling **${args}**. How cute :blush:`
          )
          .setImage(cuddleGIFS[Math.floor(Math.random() * cuddleGIFS.length)])
          .setColor("BLUE");
        message.channel.send({ embeds: [cuddleEmbed] });
      } else if (command === prefix + "question" && args[0] !== undefined) {
        let questions = JSON.parse(fs.readFileSync("./JSON Files/Question Answers.json"));
        let randomAns =
          questions.Answers[
            Math.floor(Math.random() * questions.Answers.length)
          ];
        if (randomAns !== questions.Answers[14]) {
          message.channel.send(
            `Your Quesion: **${args
              .slice(0)
              .join(" ")}** \nAnswer: **${randomAns}**`
          );
        }
        if (randomAns === questions.Answers[14]) {
          message.channel
            .send(
              `Your Quesion: **${args.slice(0).join(" ")}** \nAnswer: **${
                questions.Answers[14]
              }**`
            )
            .then((msg) => {
              setTimeout(() => {
                msg.reply(
                  `The one min is complete. The answer is: **${
                    questions.Answers[
                      Math.floor(Math.random() * questions.Answers.length)
                    ]
                  }**. Yes I was not joking about the minute part`
                );
              }, 60000);
            });
        }
      } else if (command === prefix + "question" && args[0] === undefined) {
        message.reply("Ask a question");
      } else if (command === prefix + "randomuser") {
        let randomUser = message.guild.members.cache
          .filter((member) => !member.user.bot)
          .random();
        message.channel.send(
          `I choose **${randomUser.displayName}**! Don't question my choice :skull:`
        );
      } else if (command === prefix + "randombot") {
        let randomBot = message.guild.members.cache
          .filter((member) => member.user.bot)
          .random();
        message.channel.send(`**${randomBot.displayName}** it is`);
      } else if (command === prefix + "say") {
        if (args[0] !== undefined && !args[0].toString().startsWith("*")) {
          if (message.author.id !== "878233248470282250") {
            message.delete().then((msg) => {
              msg.channel.send(`${args.slice(0).join(" ")}`);
            });
          } else {
            return;
          }
        } else {
          message.reply("Say what?");
        }
      }
    });
  },
};
