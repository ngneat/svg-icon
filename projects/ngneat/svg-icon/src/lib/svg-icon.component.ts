import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  isDevMode,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChange
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
        font-size: 1.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnInit, OnChanges {
  @Input()
  key: string;

  @Input()
  size: 'lg' | 'md' | 'sm' | 'xs' = 'md';

  @Input()
  fontSize: number;

  @Input()
  color: string;

  private mergedConfig: SVG_CONFIG;

  constructor(
    private host: ElementRef,
    private registry: SvgIconRegistry,
    @Inject(SVG_ICONS_CONFIG) private config: SVG_CONFIG,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.mergedConfig = this.createConfig();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.element.setAttribute('role', 'img');
      this.render();
    }
  }

  ngOnChanges(changes: Changes) {
    if (changes.key?.firstChange === false) {
      this.element.classList.remove(`svg-icon-${changes.key.previousValue}`);
      this.render();
    }

    if (changes.color?.currentValue) {
      this.element.style.color = this.color;
    }

    if (changes.size?.currentValue) {
      this.element.style.fontSize = this.mergedConfig.sizes[this.size];
    }

    if (changes.fontSize?.currentValue) {
      this.element.style.fontSize = this.fontSize;
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
      console.warn(`⚠️ ${this.key} is missing!`);
    }
  }

  private createConfig() {
    const defaults: SVG_CONFIG = {
      sizes: {
        xs: '1rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '2rem'
      }
    };

    return {
      ...defaults,
      ...this.config
    };
  }
}
