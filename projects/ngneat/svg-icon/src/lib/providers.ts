import {
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { SvgIconRegistry } from './registry';

export interface SvgIconType {
  name: string;
  data: string;
}

export interface SVG_CONFIG {
  icons?: SvgIconType | SvgIconType[];
  color?: string;
  defaultSize?: keyof SVG_CONFIG['sizes'];
  missingIconFallback?: SvgIconType;
  sizes: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
  } & Record<string, string>;
}

export const SVG_ICONS_CONFIG = new InjectionToken<SVG_CONFIG>('SVG_ICONS_CONFIG', {
  providedIn: 'root',
  factory() {
    return {} as SVG_CONFIG;
  },
});
export const SVG_ICONS = new InjectionToken<SVG_CONFIG['icons']>('SVG_ICONS');
export const SVG_MISSING_ICON_FALLBACK = new InjectionToken<SVG_CONFIG['missingIconFallback']>(
  'SVG_MISSING_ICON_FALLBACK',
  {
    providedIn: 'root',
    factory() {
      return undefined;
    },
  }
);

export function provideSvgIcons(icons: SvgIconType | SvgIconType[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue() {
        inject(SvgIconRegistry).register(icons);
      },
    },
  ]);
}

export function provideSvgIconsConfig(config: Partial<SVG_CONFIG>): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SVG_ICONS_CONFIG,
      useValue: config,
    },
  ]);
}
