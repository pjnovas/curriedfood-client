import { DarkTheme, Colors } from 'react-native-paper';

export const colors = {
  ...DarkTheme.colors,
  primary: Colors.pink800,
  accent: Colors.purpleA700,
  background: Colors.blueGrey900,
  surface: Colors.blueGrey900,
  error: '#CF6679',
  onBackground: Colors.white,
  onSurface: Colors.white,
  text: Colors.white
  // disabled: color(white)
  //   .alpha(0.38)
  //   .rgb()
  //   .string(),
  // placeholder: color(white)
  //   .alpha(0.54)
  //   .rgb()
  //   .string(),
  // backdrop: color(black)
  //   .alpha(0.5)
  //   .rgb()
  //   .string(),
  // notification: pinkA100,
};

export default {
  ...DarkTheme,
  dark: true,
  mode: 'exact',
  roundness: 4,
  colors,
  // fonts: configureFonts(),
  animation: {
    scale: 1.0
  }
};
