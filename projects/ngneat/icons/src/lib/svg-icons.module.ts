import { ModuleWithProviders, NgModule } from '@angular/core';
import { SvgIconComponent } from './svg-icon.component';
import { SVG_CONFIG, SVG_ICONS_CONFIG } from './types';

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
}
