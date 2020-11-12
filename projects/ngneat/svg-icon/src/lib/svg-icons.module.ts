import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { SvgIconRegistry } from './registry';
import { SvgIconComponent } from './svg-icon.component';
import { SvgIconType, SVG_CONFIG, SVG_ICONS, SVG_ICONS_CONFIG } from './types';

@NgModule({
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent]
})
export class SvgIconsModule {
  static forRoot(config: Partial<SVG_CONFIG> = {}): ModuleWithProviders {
    return {
      ngModule: SvgIconsModule,
      providers: [
        {
          provide: SVG_ICONS_CONFIG,
          useValue: config
        }
      ]
    };
  }

  static forChild(icons: SvgIconType | SvgIconType[]) {
    return {
      ngModule: SvgIconsModule,
      providers: [{ provide: SVG_ICONS, useValue: icons }]
    };
  }

  constructor(@Optional() @Inject(SVG_ICONS) icons, private service: SvgIconRegistry) {
    if (icons) {
      this.service.register(icons);
    }
  }
}
