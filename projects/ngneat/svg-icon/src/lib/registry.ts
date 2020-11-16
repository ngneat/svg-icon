import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable } from '@angular/core';
import { SVG_CONFIG, SVG_ICONS_CONFIG, SvgIconType } from './types';

class SvgIcon {
  appliedAttributes = false;

  constructor(public content: string) {}
}

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  private svgMap = new Map<string, SvgIcon>();
  private XMLSerializer: XMLSerializer;
  private document: Document = inject(DOCUMENT);

  constructor(@Inject(SVG_ICONS_CONFIG) config: SVG_CONFIG) {
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

  register(icons: SvgIconType | SvgIconType[]) {
    const toArray = Array.isArray(icons) ? icons : [icons];

    for (const { name, data } of toArray) {
      if (!this.hasSvg(name)) {
        this.addIcon(name, data);
      }
    }
  }

  getSvgElement(iconName: string): SVGSVGElement {
    const svgString = this.get(iconName);
    const div = this.document.createElement('div');
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
    const div = this.document.createElement('div');
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
}
