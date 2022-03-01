import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, SimpleChanges} from '@angular/core';

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
  @Input() key!: string;
  @Input() size!: keyof SVG_CONFIG['sizes'];
  @Input() width!: number | string;
  @Input() height!: number | string;
  @Input() fontSize!: number | string;
  @Input() color!: string;
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.key) {
      this.setIcon(this.key);
    }

    if (changes.size) {
      this.setIconSize(this.mergedConfig.sizes[this.size]!);
    }

    if (changes.width) {
      this.element.style.width = coerceCssPixelValue(this.width);
    }

    if (changes.height) {
      this.element.style.height = coerceCssPixelValue(this.height);
    }

    if (changes.fontSize) {
      this.setIconSize(coerceCssPixelValue(this.fontSize));
    }

    if (changes.color) {
      this.element.style.color = this.color;
    }
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

  private setIcon(name: string) {
    const icon = this.registry.get(name) ?? this.registry.get(this.config.missingIconFallback?.name);

    if (icon) {
      this.element.setAttribute('aria-label', `${name}-icon`);
      this.element.classList.remove(getIconClassName(this.lastKey));
      this.lastKey = name;
      this.element.classList.add(getIconClassName(name));
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
  return `svg-icon-${key}`;
}
