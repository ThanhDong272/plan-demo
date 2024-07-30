export const lightColors = {
  black: "#000000",
  black16: "#161616",
  blackOpacity10: "rgba(0, 0, 0, 0.1)",
  white: "#FFFFFF",
  blue: "#4472C4",
  blueOpacity10: "rgba(68, 114, 196, 0.1)",
  grey93: "#939393",
  greyB6: "#B6B7B8",
  red: "#E03535",
};

const SCANDIA_BOLD = "Scandia-Bold";
const SCANDIA_LIGHT = "Scandia-Light";
const SCANDIA_MEDIUM = "Scandia-Medium";
const SCANDIA_MEDIUM_ITALIC = "Scandia-MediumItalic";
const SCANDIA_REGULAR = "Scandia-Regular";

export const fonts = {
  scandia: {
    bold: SCANDIA_BOLD,
    light: SCANDIA_LIGHT,
    medium: SCANDIA_MEDIUM,
    mediumItalic: SCANDIA_MEDIUM_ITALIC,
    regular: SCANDIA_REGULAR,
  },
};

const DefaultTheme = {
  colors: lightColors,
  fonts,
};

export default DefaultTheme;
