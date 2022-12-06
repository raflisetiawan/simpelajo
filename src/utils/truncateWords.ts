function truncateWords(sentence: any, amount: any, tail: any) {
  const words = sentence.split(" ");

  if (amount >= words.length) {
    return sentence;
  }

  const truncated = words.slice(0, amount);
  return `${truncated.join(" ")}${tail}`;
}

export default truncateWords;
