import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { SvgIconRegistry } from './registry';
import { SvgIconComponent } from './svg-icon.component';
import { SVG_CONFIG, SVG_ICONS, SVG_ICONS_CONFIG, SVG_MISSING_ICON, SvgIconType } from './types';

@NgModule({
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent],
})
export class SvgIconsModule {
  static forRoot(config: Partial<SVG_CONFIG> = {}): ModuleWithProviders<SvgIconsModule> {
    return {
      ngModule: SvgIconsModule,
      providers: [
        {
          provide: SVG_ICONS_CONFIG,
          useValue: config,
        },
      ],
    };
  }

  static forChild(icons: SvgIconType | SvgIconType[]): ModuleWithProviders<SvgIconsModule> {
    return {
      ngModule: SvgIconsModule,
      providers: [{ provide: SVG_ICONS, useValue: icons }],
    };
  }

  constructor(
    @Optional() @Inject(SVG_ICONS) icons: SvgIconType | SvgIconType[],
    @Optional() @Inject(SVG_MISSING_ICON) missingIcon: SvgIconType,
    private service: SvgIconRegistry
  ) {
    if (icons) {
      this.service.register(icons);
    }

    if (missingIcon) {
      this.service.register(missingIcon);
    }
  }
}
