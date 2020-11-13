import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { settingsIcon } from '../svg';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SvgIconsModule.forChild(settingsIcon)]
})
export class DashboardModule {
}
