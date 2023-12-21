export default function capitalize(text) {
  const strArray = text.trim().split("");
  const firtsLetter = strArray[0].toUpperCase();
  strArray.splice(0, 1, firtsLetter);
  return strArray.join("");
}
