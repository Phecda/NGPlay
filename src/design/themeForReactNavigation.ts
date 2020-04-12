import { DefaultTheme } from '@react-navigation/native';
import { rainbow } from './color';

type Theme = typeof DefaultTheme;

export const light: Theme = {
  dark: false,
  colors: {
    primary: rainbow.teal.light,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(224, 224, 224)',
  },
};

export const dark: Theme = {
  dark: true,
  colors: {
    primary: rainbow.teal.dark,
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
  },
};
