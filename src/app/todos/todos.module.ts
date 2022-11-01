import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { provideSvgIcons, SvgIconComponent } from '@ngneat/svg-icon';
import { settingsIcon } from '@app/svg/settings';
import { locationIcon } from '@app/svg/location';

@NgModule({
  declarations: [TodosComponent],
  providers: [provideSvgIcons([locationIcon, settingsIcon])],
  imports: [CommonModule, TodosRoutingModule, SvgIconComponent],
})
export class TodosModule {}
