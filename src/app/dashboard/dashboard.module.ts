import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { dashboardIcon } from '@app/svg/dashboard';
import { groupIcons } from '@app/svg/group';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, SvgIconsModule.forChild([dashboardIcon, ...groupIcons])]
})
export class DashboardModule {
}
