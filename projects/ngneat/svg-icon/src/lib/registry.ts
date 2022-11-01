import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable, Injector } from '@angular/core';

import { SVG_CONFIG, SVG_ICONS_CONFIG, SvgIconType } from './providers';

class SvgIcon {
  init = false;

  constructor(public content: string) {}
}

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  private svgMap = new Map<string, SvgIcon>();
  private document = inject(DOCUMENT);

  constructor(@Inject(SVG_ICONS_CONFIG) config: SVG_CONFIG) {
    if (config?.icons) {
      this.register(config.icons);
    }

    if (config?.missingIconFallback) {
      this.register(config.missingIconFallback);
    }
  }

  getAll() {
    return this.svgMap;
  }

  get(key: string | undefined, config?: { preserveAspectRatio?: string }): string | undefined {
    const icon = key && this.svgMap.get(key);

    if (!icon) {
      return undefined;
    }

    if (!icon.init) {
      const svg = this.toElement(icon.content);
      svg.setAttribute('fit', '');
      svg.setAttribute('height', '100%');
      svg.setAttribute('width', '100%');
      svg.setAttribute('preserveAspectRatio', config?.preserveAspectRatio ?? 'xMidYMid meet');
      svg.setAttribute('focusable', 'false');

      icon.content = svg.outerHTML;
      icon.init = true;
    }

    return icon.content;
  }

  register(icons: SvgIconType | SvgIconType[]) {
    for (const { name, data } of Array.isArray(icons) ? icons : [icons]) {
      if (!this.svgMap.has(name)) {
        this.svgMap.set(name, new SvgIcon(data));
      }
    }
  }

  getSvgElement(name: string): SVGSVGElement | undefined {
    const content = this.get(name);

    if (!content) {
      return undefined;
    }

    const div = this.document.createElement('div');
    div.innerHTML = content;

    return div.querySelector('svg') as SVGSVGElement;
  }

  private toElement(content: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = content;

    return div.querySelector('svg') as SVGElement;
  }
}
