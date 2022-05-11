import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
};

export const icons = {
  tiny: 15,
  s: 20,
  m: 30,
  l: 45,
  xl: 60,
};

export const borderRadii = {
  s: 4,
  m: 10,
  l: 25,
  xl: 75,
};
