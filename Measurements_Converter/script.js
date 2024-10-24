const lengthUnits = ["Meters", "Kilometers", "Miles", "Inches", "Feet"];
const weightUnits = ["Grams", "Kilograms", "Pounds", "Ounces"];
const temperatureUnits = ["Celsius", "Fahrenheit", "Kelvin"];

const unitConversions = {
  length: {
    Meters: {
      Kilometers: (value) => value / 1000,
      Miles: (value) => value / 1609.34,
      Inches: (value) => value * 39.3701,
      Feet: (value) => value * 3.28084,
    },
    Kilometers: {
      Meters: (value) => value * 1000,
      Miles: (value) => value / 1.60934,
      Inches: (value) => value * 39370.1,
      Feet: (value) => value * 3280.84,
    },
    Miles: {
      Meters: (value) => value * 1609.34,
      Kilometers: (value) => value * 1.60934,
      Inches: (value) => value * 63360,
      Feet: (value) => value * 5280,
    },
    Inches: {
      Meters: (value) => value / 39.3701,
      Kilometers: (value) => value / 39370.1,
      Miles: (value) => value / 63360,
      Feet: (value) => value / 12,
    },
    Feet: {
      Meters: (value) => value / 3.28084,
      Kilometers: (value) => value / 3280.84,
      Miles: (value) => value / 5280,
      Inches: (value) => value * 12,
    },
  },
  weight: {
    Grams: {
      Kilograms: (value) => value / 1000,
      Pounds: (value) => value / 453.592,
      Ounces: (value) => value / 28.3495,
    },
    Kilograms: {
      Grams: (value) => value * 1000,
      Pounds: (value) => value * 2.20462,
      Ounces: (value) => value * 35.274,
    },
    Pounds: {
      Grams: (value) => value * 453.592,
      Kilograms: (value) => value / 2.20462,
      Ounces: (value) => value * 16,
    },
    Ounces: {
      Grams: (value) => value * 28.3495,
      Kilograms: (value) => value / 35.274,
      Pounds: (value) => value / 16,
    },
  },
  temperature: {
    Celsius: {
      Fahrenheit: (value) => (value * 9) / 5 + 32,
      Kelvin: (value) => value + 273.15,
    },
    Fahrenheit: {
      Celsius: (value) => ((value - 32) * 5) / 9,
      Kelvin: (value) => ((value + 459.67) * 5) / 9,
    },
    Kelvin: {
      Celsius: (value) => value - 273.15,
      Fahrenheit: (value) => (value * 9) / 5 - 459.67,
    },
  },
};

const updateUnits = () => {
  const category = document.getElementById("category").value;
  let units = [];

  if (category === "length") {
    units = lengthUnits;
  } else if (category === "weight") {
    units = weightUnits;
  } else if (category === "temperature") {
    units = temperatureUnits;
  }

  const fromUnitSelect = document.getElementById("fromUnit");
  const toUnitSelect = document.getElementById("toUnit");

  fromUnitSelect.innerHTML = units
    .map((unit) => `<option value="${unit}">${unit}</option>`)
    .join("");
  toUnitSelect.innerHTML = units
    .map((unit) => `<option value="${unit}">${unit}</option>`)
    .join("");

  convert(); // Perform conversion based on the default unit selection
};

const convert = () => {
  const category = document.getElementById("category").value;
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const inputValue = parseFloat(document.getElementById("inputValue").value);

  const errorMessage = document.getElementById("errorMessage");
  const resultValue = document.getElementById("resultValue");

  // Clear any previous error messages
  errorMessage.textContent = "";

  // Validate the input value
  if (isNaN(inputValue)) {
    resultValue.textContent = "";
    errorMessage.textContent = "Please enter a valid number.";
    return;
  }

  // Perform the conversion
  const conversionFunction = unitConversions[category][fromUnit][toUnit];
  const convertedValue = conversionFunction(inputValue);

  resultValue.textContent = `${convertedValue.toFixed(2)} ${toUnit}`;
};

const resetConverter = () => {
  document.getElementById("inputValue").value = "";
  document.getElementById("resultValue").textContent = "";
  document.getElementById("errorMessage").textContent = "";
};

// Initialize the default units when the page loads
updateUnits();
