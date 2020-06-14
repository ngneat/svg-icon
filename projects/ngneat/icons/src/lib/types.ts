import { InjectionToken } from '@angular/core';
import * as icons from '../../../../../src/assets/svg/my-icons.model';

export type SVG_CONFIG = {
  icons?: any;
  color?: string;
  sizes: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
};
export const SVG_ICONS_CONFIG = new InjectionToken('SVG_ICONS_CONFIG');

export function fromSvgProps(propsMap: { [key: string]: { name: string; data: string } }) {
  const map = {};

  for (const { name, data } of Object.values(icons)) {
    map[name] = data;
  }

  return map;
}
