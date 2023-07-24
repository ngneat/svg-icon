import {inject} from "@angular/core";
import {SvgIconRegistry} from "@ngneat/svg-icon";

export function injectRegisterIcons(
  ...params: Parameters<(typeof SvgIconRegistry.prototype)['register']>
) {
  inject(SvgIconRegistry).register(...params);
}
