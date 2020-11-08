import { Inject, Injectable } from '@angular/core';
import { SVG_CONFIG, SVG_ICONS_CONFIG } from './types';

interface SvgToTSIcon {
  name: string;
  data: string;
}

class SvgIcon {
  appliedAttributes = false;

  constructor(public content: string) {}
}

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  private svgMap = new Map<string, SvgIcon>();
  private XMLSerializer: XMLSerializer;

  constructor(@Inject(SVG_ICONS_CONFIG) private config: SVG_CONFIG) {
    if (config.icons) {
      this.register(config.icons);
    }
  }

  private get lazyXMLSerializer() {
    if (!this.XMLSerializer) {
      this.XMLSerializer = new XMLSerializer();
    }

    return this.XMLSerializer;
  }

  getAll() {
    return this.svgMap;
  }

  get(key: string, options: { setDimensions: boolean } = { setDimensions: true }): string | undefined {
    const svg = this.svgMap.get(key);

    if (!svg) {
      return undefined;
    }

    if (!svg.appliedAttributes) {
      this.addAttributes(svg, options);
    }

    return svg.content;
  }

  register(svg: Record<string, string | SvgToTSIcon> | SvgToTSIcon[], overrideExisting = true) {
    for (const [key, content] of this.normalizeSvgs(svg)) {
      if (overrideExisting || !this.svgMap.has(key)) {
        this.addIcon(key, content);
      }
    }
  }

  getSvgElement(iconName: string): SVGSVGElement {
    const svgString = this.get(iconName);
    const div = document.createElement('DIV');
    div.innerHTML = svgString;
    const svg = div.querySelector('svg') as SVGSVGElement;

    if (!svg) {
      throw Error('<svg> tag not found');
    }

    return svg;
  }

  hasSvg(key: string) {
    return this.svgMap.has(key);
  }

  private addAttributes(config: SvgIcon, options: { setDimensions: boolean }) {
    const svg = this.toElement(config.content);
    this.setAttributes(svg, options);
    config.content = this.asRaw(svg);
    config.appliedAttributes = true;
  }

  private asRaw(svgElement: SVGElement) {
    let content = svgElement.outerHTML;

    // Handle IE11
    if (content === undefined) {
      content = this.lazyXMLSerializer.serializeToString(svgElement);
    }

    return content;
  }

  private toElement(content: string): SVGElement {
    const div = document.createElement('DIV');
    div.innerHTML = content;
    const svgElement = div.querySelector('svg') as SVGElement;
    if (!svgElement) {
      throw Error('<svg> tag not found');
    }

    return svgElement;
  }

  private setAttributes(svg: SVGElement, options: { setDimensions: boolean }): SVGElement {
    if (!svg.getAttribute('xmlns')) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    svg.setAttribute('fit', '');

    if (options.setDimensions) {
      svg.setAttribute('height', '100%');
      svg.setAttribute('width', '100%');
    }

    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Disable IE11 default behavior to make SVGs focusable.
    svg.setAttribute('focusable', 'false');

    return svg;
  }

  private addIcon(name: string, data: string) {
    const config = new SvgIcon(data);
    this.svgMap.set(name, config);
  }

  private svgTsToEntry({ name, data }: SvgToTSIcon) {
    return [name, data];
  }

  private isString(value): value is string {
    return typeof value === 'string';
  }

  private normalizeSvgs(svg: Parameters<this['register']>[0]) {
    return Array.isArray(svg)
      ? svg.map(this.svgTsToEntry)
      : Object.entries(svg).map(entry => {
          const [, content] = entry;

          return this.isString(content) ? (entry as [string, string]) : this.svgTsToEntry(content);
        });
  }
}
