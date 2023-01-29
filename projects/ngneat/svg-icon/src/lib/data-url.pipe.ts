import {inject, Pipe, PipeTransform} from "@angular/core";
import {SvgIconRegistry} from "../lib/registry";
import {SvgIcons} from "../lib/types";

@Pipe({
  name: 'svgToDataUrl',
  standalone: true,
})
export class SvgToDataUrlPipe implements PipeTransform {
  registry = inject(SvgIconRegistry);
  transform(key: SvgIcons): string | undefined {
    return this.registry.get(key, {asDataUrl: true});
  }

}
