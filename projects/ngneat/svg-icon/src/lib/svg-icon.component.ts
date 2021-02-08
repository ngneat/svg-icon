import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  isDevMode,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { SvgIconRegistry } from './registry';
import { SVG_CONFIG, SVG_ICONS_CONFIG } from './types';

type Changes = {
  color: SimpleChange;
  fontSize: SimpleChange;
  size: SimpleChange;
  key: SimpleChange;
};

@Component({
  selector: 'svg-icon',
  template: '',
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
export class SvgIconComponent implements OnInit, OnChanges {
  @Input()
  key: string;

  @Input()
  size: 'lg' | 'md' | 'sm' | 'xs' = 'md';

  @Input()
  fontSize: number | string;

  @Input()
  color: string;

  private mergedConfig: SVG_CONFIG;
  private resolvedSize: string;

  constructor(
    private host: ElementRef,
    private registry: SvgIconRegistry,
    @Inject(SVG_ICONS_CONFIG) private config: SVG_CONFIG
  ) {
    this.mergedConfig = this.createConfig();
  }

  ngOnInit() {
    this.element.setAttribute('role', 'img');
    this.render();
  }

  ngOnChanges(changes: Changes) {
    const keyChanged = changes.key?.firstChange === false;

    if (keyChanged) {
      this.element.classList.remove(`svg-icon-${changes.key.previousValue}`);
      this.render();
    }

    if (changes.color?.currentValue) {
      this.element.style.color = this.color;
    }

    let resolveFontSize = this.resolvedSize;

    if (changes.fontSize?.currentValue) {
      resolveFontSize = changes.fontSize.currentValue;
    } else if (changes.size?.currentValue) {
      const size = changes.size.currentValue;
      resolveFontSize = this.mergedConfig.sizes[size];
    } else if (!this.resolvedSize) {
      const size = this.mergedConfig.defaultSize;
      if (size) {
        resolveFontSize = this.mergedConfig.sizes[size];
      }
    }

    if (keyChanged || resolveFontSize !== this.resolvedSize) {
      this.element.style.fontSize = resolveFontSize;
      this.resolvedSize = resolveFontSize;
    }
  }

  get element() {
    return this.host.nativeElement;
  }

  private render() {
    if (this.key && this.registry.hasSvg(this.key)) {
      this.element.classList.remove();
      this.element.classList.add(`svg-icon-${this.key}`);
      this.element.innerHTML = this.registry.get(this.key);
    } else if (isDevMode()) {
      console.warn(`${this.key} is missing!`);
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
}
