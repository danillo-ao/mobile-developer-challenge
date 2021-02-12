const family = require('./glyphmap.json');

export type IconNames = keyof typeof family;

export type IconProps = {
  name?: IconNames;
  size?: number;
  color?: string;
};
