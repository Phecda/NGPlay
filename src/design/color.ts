import { DynamicValue } from 'react-native-dark-mode';

export const labelColor = {
  primary: new DynamicValue('#000000', '#FFFFFF'),
  secondary: new DynamicValue('#3C3C4399', '#EBEBF599'),
  tertiary: new DynamicValue('#3C3C434D', '#EBEBF54D'),
  quaternary: new DynamicValue('#3C3C432E', '#EBEBF52E'),
};

export const placeholderColor = new DynamicValue('#3C3C434D', '#EBEBF54D');

export const linkColor = new DynamicValue('#007AFF', '#0984FF');

export const separator = {
  opaque: new DynamicValue('#C6C6C8', '#38383A'),
  translucent: new DynamicValue('#3C3C434A', '#54545899'),
};

export const fillColor = {
  primary: new DynamicValue('#78788033', '#7878805C'),
  secondary: new DynamicValue('#78788029', '#78788052'),
  tertiary: new DynamicValue('#7676801F', '#7676803D'),
  quaternary: new DynamicValue('#74748014', '#7676802E'),
};

export const backgroundColor = {
  primary: new DynamicValue('#FFFFFF', '#000000'),
  secondary: new DynamicValue('#F2F2F7', '#1C1C1E'),
  tertiary: new DynamicValue('#FFFFFF', '#2C2C2E'),
};

export const groupedBackgroundColor = {
  primary: new DynamicValue('#F2F2F7', '#000000'),
  secondary: new DynamicValue('#FFFFFF', '#1C1C1E'),
  tertiary: new DynamicValue('#F2F2F7', '#2C2C2E'),
};
