import { ChangeDetectionStrategy, Component, ElementRef, Inject, SimpleChanges, input } from '@angular/core';
import { SvgIcons } from './types';
import { SvgIconRegistry } from './registry';
import { SVG_CONFIG, SVG_ICONS_CONFIG } from './providers';

@Component({
  selector: 'svg-icon',
  template: '',
  standalone: true,
  host: {
    role: 'img',
    'aria-hidden': 'true',
  },
  styles: [
    `
      :host {
        display: inline-block;
        fill: currentColor;
        width: var(--svg-icon-width, 1em);
        height: var(--svg-icon-height, 1em);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  readonly key = input<SvgIcons>();
  readonly fallback = input<SvgIcons>();
  readonly size = input<keyof SVG_CONFIG['sizes']>();
  readonly width = input<number | string>();
  readonly height = input<number | string>();
  readonly fontSize = input<number | string>();
  readonly color = input<string>();
  readonly noShrink = input(false);
  readonly preserveAspectRatio = input<string>();

  private mergedConfig: SVG_CONFIG;
  private lastKey!: string;
  private init = false;

  constructor(
    private host: ElementRef,
    private registry: SvgIconRegistry,
    @Inject(SVG_ICONS_CONFIG) private config: SVG_CONFIG
  ) {
    this.mergedConfig = this.createConfig();
  }

  get element(): HTMLElement {
    return this.host.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.key?.currentValue) {
      this.setIcon(changes.key.currentValue);
    }

    if (changes.size?.currentValue) {
      this.setIconSize(this.mergedConfig.sizes[changes.size.currentValue]!);
    }

    if (changes.fontSize?.currentValue) {
      this.setIconSize(coerceCssPixelValue(changes.fontSize.currentValue));
    }

    // If on the first change no size was passed, set the default size
    if (!this.init && !changes.size?.currentValue && !changes.fontSize?.currentValue) {
      this.setIconSize(this.mergedConfig.sizes[this.mergedConfig.defaultSize || 'md']!);
    }

    if (changes.width?.currentValue) {
      this.element.style.width = `var(--svg-icon-width, ${coerceCssPixelValue(changes.width.currentValue)})`;
    }

    if (changes.height?.currentValue) {
      this.element.style.height = `var(--svg-icon-height, ${coerceCssPixelValue(changes.height.currentValue)})`;
    }

    if (changes.color?.currentValue) {
      this.element.style.color = `var(--svg-icon-color, ${changes.color.currentValue})`;
    }

    this.init = true;
  }

  private createConfig() {
    const defaults: SVG_CONFIG = {
      sizes: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: `1rem`,
        lg: '1.5rem',
        xl: '2rem',
        xxl: '2.5rem',
      },
    };

    const mergedConfig = {
      ...defaults,
      ...this.config,
    };

    mergedConfig.sizes = Object.entries({ ...defaults.sizes, ...mergedConfig.sizes }).reduce((acc, [key, value]) => {
      acc[key] = `var(--svg-icon-font-size-${key}, ${value})`;

      return acc;
    }, {} as SVG_CONFIG['sizes']);

    return mergedConfig;
  }

  private setIconSize(size: string) {
    this.element.style.fontSize = size;
    if (this.noShrink()) {
      this.element.style.minWidth = size;
    }
  }

  private setIcon(name: string) {
    const config = { preserveAspectRatio: this.preserveAspectRatio() };
    const icon =
      this.registry.get(name, config) ??
      this.registry.get(this.fallback() ?? this.config.missingIconFallback?.name, config);

    if (icon) {
      this.element.setAttribute('aria-label', `${name}-icon`);

      if (this.lastKey) {
        this.element.classList.remove(getIconClassName(this.lastKey));
      }

      this.lastKey = name;

      if (name) {
        this.element.classList.add(getIconClassName(name));
      }

      this.element.innerHTML = icon;
    }
  }
}

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }

  return typeof value === 'string' ? value : `${value}px`;
}

function getIconClassName(key: string) {
  return `svg-icon-${key.replace(/ /g, '-')}`;
}
