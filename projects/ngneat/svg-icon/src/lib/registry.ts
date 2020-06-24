import { Inject, Injectable } from '@angular/core';
import { SVG_CONFIG, SVG_ICONS_CONFIG } from './types';

type HashMap<T = any> = {
  [key: string]: T;
};

type Options = { setDimensions?: boolean; useRef?: boolean };

class SvgIcon {
  appliedAttributes = false;

  constructor(public content: string) {}
}

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  private svgMap = new Map<string, SvgIcon>();
  private refMap = new Map<string, string>();
  private XMLSerializer: XMLSerializer;
  private refContainer: HTMLElement;

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

  get(key: string, options: Options = {}): string | undefined {
    const merged = { setDimensions: true, ...options };
    const svg = this.svgMap.get(key);

    if (!svg) {
      return undefined;
    }

    if (!svg.appliedAttributes) {
      this.addAttributes(key, svg, merged);
    }

    return merged.useRef ? this.getRef(key, merged) : svg.content;
  }

  register(svg: HashMap) {
    for (const [key, content] of Object.entries(svg)) {
      this.addIcon(key, content);
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

  private addAttributes(key: string, config: SvgIcon, options: Options) {
    const svg = this.toElement(config.content);
    this.setAttributes(svg, options);
    svg.setAttribute('id', key);
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

  private setAttributes(svg: SVGElement, options: Options): SVGElement {
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

  private getRef(key: string, options: Options) {
    if (!this.refMap.has(key)) {
      const svg = this.toElement(`<svg><use href="#${key}"></use></svg>`);
      this.setAttributes(svg, options);
      this.createIconRef(key);
      this.refMap.set(key, this.asRaw(svg));
    }

    return this.refMap.get(key);
  }

  private createRefContainer() {
    const div = document.createElement('DIV');
    div.classList.add('svg-icon-ref-container');
    div.style.display = 'none';
    this.refContainer = div;
    document.body.append(div);
  }

  private createIconRef(key: string) {
    !this.refContainer && this.createRefContainer();
    this.refContainer.innerHTML += this.svgMap.get(key).content;
  }
}
