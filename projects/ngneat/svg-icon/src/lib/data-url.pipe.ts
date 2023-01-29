import {inject, Pipe, PipeTransform} from "@angular/core";
import {SvgIconRegistry, SvgIcons} from "@ngneat/svg-icon";

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
