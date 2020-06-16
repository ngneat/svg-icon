import { InjectionToken } from '@angular/core';

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
