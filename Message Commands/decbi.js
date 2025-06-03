module.exports = {
  /**
   * @param {discord.Message} message
   */
  execute(message) {
    let tokens = message.content.split(" ");
    if (tokens[1] === undefined)
      return message.channel.send("No base 10 number provided");
    if (isNaN(tokens[1]))
      return message.channel.send("Invalid number provided");
    let numberParts = tokens[1].split(".");
    let integerPart = numberParts[0];
    let fractionPart = numberParts[1] ? numberParts[1] : undefined;
    let integerArr = [];
    let fractionArr = [];
    let quotient;
    let remainder;
    do {
      quotient = Number.parseInt(integerPart / 2);
      remainder = integerPart % 2;
      integerPart = quotient;
      integerArr.push(remainder);
    } while (quotient > 0);
    integerArr = integerArr.reverse();
    if (fractionPart != undefined) {
      fractionPart = Number.parseFloat(0 + "." + fractionPart);
      for (let i = 0; i < 5; i++) {
        let integralPart = Number.parseInt(fractionPart * 2);
        fractionArr.push(integralPart);
        fractionPart = (fractionPart * 2) % 1;
      }
    }
    if (fractionArr.length != 0) {
      message.channel.send(integerArr.join("") + "." + fractionArr.join(""));
    } else {
      message.channel.send(integerArr.join(""));
    }
  },
};
