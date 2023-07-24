import {inject} from "@angular/core";
import {SvgIconRegistry} from "./registry";

export function injectRegisterIcons(
  ...params: Parameters<(typeof SvgIconRegistry.prototype)['register']>
) {
  inject(SvgIconRegistry).register(...params);
}
