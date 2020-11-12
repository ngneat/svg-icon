import { InjectionToken } from '@angular/core';

export interface SvgIconType {
  name: string;
  data: string;
}

export interface SVG_CONFIG {
  icons?: SvgIconType | SvgIconType[];
  color?: string;
  defaultSize?: keyof SVG_CONFIG['sizes'];
  sizes: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
}

export const SVG_ICONS_CONFIG = new InjectionToken<SVG_CONFIG>('SVG_ICONS_CONFIG');
export const SVG_ICONS = new InjectionToken<SVG_CONFIG['icons']>('SVG_ICONS');
