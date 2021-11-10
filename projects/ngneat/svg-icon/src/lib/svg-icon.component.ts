import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';

import { SvgIconRegistry } from './registry';
import { SVG_CONFIG, SVG_ICONS_CONFIG } from './types';

@Component({
  selector: 'svg-icon',
  template: '',
  host: {
    role: 'img',
    'aria-hidden': 'true',
  },
  styles: [
    `
      :host {
        display: inline-block;
        fill: currentColor;
        width: 1em;
        height: 1em;
        font-size: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input()
  set key(name: string) {
    const icon = this.registry.get(name) ?? this.registry.get(this.config.missingIconFallback?.name);

    if (icon) {
      this.element.setAttribute('aria-label', `${name}-icon`);
      this.element.classList.remove(getIconClassName(this.lastKey));
      this.lastKey = name;
      this.element.classList.add(getIconClassName(name));
      this.element.innerHTML = icon;
    }
  }

  @Input()
  set size(value: keyof SVG_CONFIG['sizes']) {
    this.setIconSize(this.mergedConfig.sizes[value]!);
  }

  @Input() set width(value: number | string) {
    this.element.style.width = coerceCssPixelValue(value);
  }

  @Input() set height(value: number | string) {
    this.element.style.height = coerceCssPixelValue(value);
  }

  @Input()
  set fontSize(value: number | string) {
    this.setIconSize(coerceCssPixelValue(value));
  }

  @Input()
  set color(color: string) {
    this.element.style.color = color;
  }

  @Input() noShrink = false;

  private mergedConfig: SVG_CONFIG;
  private lastKey!: string;

  constructor(
    private host: ElementRef,
    private registry: SvgIconRegistry,
    @Inject(SVG_ICONS_CONFIG) private config: SVG_CONFIG
  ) {
    this.mergedConfig = this.createConfig();
    this.element.style.fontSize = this.mergedConfig.sizes[this.mergedConfig.defaultSize || 'md']!;
  }

  get element(): HTMLElement {
    return this.host.nativeElement;
  }

  private createConfig() {
    const defaults: SVG_CONFIG = {
      sizes: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '2.5rem',
      },
    };

    return {
      ...defaults,
      ...this.config,
    };
  }

  private setIconSize(size: string) {
    this.element.style.fontSize = size;
    if (this.noShrink) {
      this.element.style.minWidth = size;
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
  return `svg-icon-${key}`;
}
