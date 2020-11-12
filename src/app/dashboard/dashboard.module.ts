import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { appSettings } from '../svg/app-settings.icon';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SvgIconsModule.forChild(appSettings)]
})
export class DashboardModule {}
