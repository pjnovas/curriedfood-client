import { DefaultTheme, Colors } from 'react-native-paper';

export default {
  ...DefaultTheme,
  dark: true,
  roundness: 4,
  colors: {
    primary: Colors.pinkA200,
    accent: Colors.purpleA700,
    background: '#f6f6f6',
    surface: Colors.white,
    error: '#B00020',
    text: Colors.black,
    onBackground: '#000000',
    onSurface: '#000000',
    // disabled: color(black).alpha(0.26).rgb().string(),
    // placeholder: color(black).alpha(0.54).rgb().string(),
    // backdrop: color(black).alpha(0.5).rgb().string(),
    notification: Colors.pinkA400
  },
  // fonts: configureFonts(),
  animation: {
    scale: 1.0
  }
};
