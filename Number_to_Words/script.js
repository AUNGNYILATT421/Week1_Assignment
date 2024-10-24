const numberToWords = (num) => {
  if (num === 0) return "zero";
  if (num < 0) return `negative ${convertToWords(-num)}`;
  return convertToWords(num);
};

const convertToWords = (num) => {
  const belowTwenty = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
  ];

  if (num < 20) return belowTwenty[num];
  if (num < 100)
    return `${tens[Math.floor(num / 10)]} ${belowTwenty[num % 10]}`.trim();
  if (num < 1000)
    return `${belowTwenty[Math.floor(num / 100)]} hundred ${convertToWords(
      num % 100
    )}`.trim();

  for (let i = 0; i < thousands.length; i++) {
    const unit = Math.pow(1000, i + 1);
    if (num < unit)
      return `${convertToWords(Math.floor(num / Math.pow(1000, i)))} ${
        thousands[i]
      } ${convertToWords(num % Math.pow(1000, i))}`.trim();
  }

  return "";
};

const convertNumberToWords = () => {
  const input = document.getElementById("numberInput").value;
  const wordsOutput = document.getElementById("wordsOutput");
  const errorMessage = document.getElementById("errorMessage");

  // Clear error message and output
  wordsOutput.textContent = "";
  errorMessage.textContent = "";

  // Check for valid input
  if (!/^-?\d+$/.test(input)) {
    errorMessage.textContent = "Please enter a valid integer.";
    return;
  }

  const number = parseInt(input, 10);
  const words = numberToWords(number);

  wordsOutput.textContent = words;
};
