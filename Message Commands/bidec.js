module.exports = {
  /**
   * @param {discord.Message} message
   */
  execute(message) {
    let tokens = message.content.split(" ");
    if (tokens[1] === undefined)
      return message.channel.send("No base 2 number provided");
    if (isNaN(tokens[1]))
      return message.channel.send("Invalid number provided");
    let numberParts = tokens[1].split(".");
    let integerPart = [...numberParts[0]];
    let fractionPart = numberParts[1] ? [...numberParts[1]] : undefined;
    let integralPart = 0;
    let fractionalPart = 0;

    for (let i = 0; i <= integerPart.length - 1; i++) {
      integralPart += integerPart[i] * Math.pow(2, integerPart.length - i - 1);
    }
    if (fractionPart != undefined) {
      for (let i = 1; i <= fractionPart.length; i++) {
        fractionalPart += fractionPart[i - 1] * Math.pow(2, i - 2 * i);
      }
    }
    let masterArr = fractionPart
      ? integerPart.concat(fractionPart)
      : integerPart;

    masterArr.map((element, index) => {
      masterArr[index] = Number.parseInt(element);
    });
    for (let i = 0; i <= masterArr.length - 1; i++) {
      if (masterArr[i] != 1 && masterArr[i] != 0) {
        message.channel.send("Invalid number provided");
        return;
      }
    }
    message.channel.send((integralPart + fractionalPart).toString());
  },
};
