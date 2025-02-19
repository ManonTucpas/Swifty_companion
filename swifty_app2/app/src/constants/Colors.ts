/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#a2b3e5';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#2D3E50',
    background: '#F7F9FC',
    tint: tintColorLight,
    icon: '#687076',

    primary: "#243d6f", // Deep purple
    secondary: "#20202633", // Purple (light)
    medium:"#A061D1", // Purple flashy
    // light: "#A061D1", // Light background color
    divider: "#D6E4F0", // Border and divider color
    muted: "#6B7B8C", // Muted text color grey

    // light: "#243d6f", // Light background color

    dark: "#0a1a3a", // Dark text color

    subtleGray: "#A7BBC8", // Subtle highlights
    borderGray: "#6c84b5", // Input borders and dividers
    error: "#FF4D4F", // Error color
    success: "#28C76F", // Success color


  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
