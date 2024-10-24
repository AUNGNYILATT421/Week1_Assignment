const colorPicker = document.getElementById("colorPicker");
const colorBox = document.getElementById("colorBox");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");
const colorName = document.getElementById("colorName");

const componentToHex = (c) => c.toString(16).padStart(2, "0");

const rgbToHex = (r, g, b) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const getColorName = (hex) => {
  const colors = {
    "#ff5733": "Red",
    "#00ffff": "Cyan",
    "#f8f8ff": "GhostWhite",
    "#ff00ff": "Magenta",
  };
  return colors[hex.toLowerCase()] || "Unknown";
};

const updateColorValues = () => {
  const color = colorPicker.value;
  colorBox.style.backgroundColor = color;

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const hsl = rgbToHsl(r, g, b);
  const hex = rgbToHex(r, g, b);

  hexValue.textContent = hex;
  rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
  hslValue.textContent = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  colorName.textContent = getColorName(hex);
};

const copyToClipboard = (id) => {
  const text = document.getElementById(id).textContent;
  navigator.clipboard
    .writeText(text)
    .then(() => alert(`Copied to clipboard: ${text}`))
    .catch(() => alert("Failed to copy"));
};

colorPicker.addEventListener("input", updateColorValues);

updateColorValues(); // Initialize with the default color
