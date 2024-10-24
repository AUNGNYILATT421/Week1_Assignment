let bitLength = 8;
let bits = Array(bitLength).fill(0);

// Update the bit length and re-render the lightbulbs
const setBitLength = () => {
  bitLength = parseInt(document.getElementById("bitLength").value);
  bits = Array(bitLength).fill(0);
  renderBulbs();
  updateDisplays();
};

// Toggle the state of a bit (lightbulb)
const toggleBit = (index) => {
  bits[index] = bits[index] === 1 ? 0 : 1;
  renderBulbs(); // Re-render bulbs after toggle
  updateDisplays(); // Update the binary and decimal display
};

// Render lightbulbs dynamically based on bit length
const renderBulbs = () => {
  const bulbContainer = document.getElementById("bulbContainer");
  bulbContainer.innerHTML = ""; // Clear previous bulbs

  for (let i = 0; i < bitLength; i++) {
    const bulb = document.createElement("img");
    bulb.classList.add("bulb");

    // Set the image source based on its state
    bulb.src = bits[i] === 1 ? "bulb-on.png" : "bulb-off.png";

    // Toggle the state on click
    bulb.addEventListener("click", () => toggleBit(i));
    bulbContainer.appendChild(bulb);
  }
};

// Update the binary and decimal displays
const updateDisplays = () => {
  const binaryValue = bits.join("");
  const decimalValue = parseInt(binaryValue, 2);

  document.getElementById("binaryDisplay").textContent = binaryValue;
  document.getElementById("decimalDisplay").textContent = decimalValue;
};

// Initialize the page with 8-bit mode
window.onload = () => {
  renderBulbs();
  updateDisplays();
};
