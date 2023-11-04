/** @type {import('tailwindcss').Config} */

const spacingPreset = require("./src/assets/styles/tailwindPresets/spacing");
const colorsPreset = require("./src/assets/styles/tailwindPresets/color");
const fontsPreset = require("./src/assets/styles/tailwindPresets/font");
const defaultPreset = require("./src/assets/styles/tailwindPresets/index");
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  presets: [defaultPreset, spacingPreset, colorsPreset, fontsPreset],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
