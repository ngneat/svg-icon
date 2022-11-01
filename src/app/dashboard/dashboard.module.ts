import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { provideSvgIcons, SvgIconComponent } from '@ngneat/svg-icon';
import { dashboardIcon } from '@app/svg/dashboard';
import { groupIcons } from '@app/svg/group';

@NgModule({
  declarations: [DashboardComponent],
  providers: [provideSvgIcons([dashboardIcon, ...groupIcons])],
  imports: [CommonModule, DashboardRoutingModule, SvgIconComponent],
})
export class DashboardModule {}
