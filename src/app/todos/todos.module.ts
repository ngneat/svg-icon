import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { settingsIcon } from '@app/svg/settings';
import { locationIcon } from '@app/svg/location';

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, TodosRoutingModule, SvgIconsModule.forChild([locationIcon, settingsIcon])]
})
export class TodosModule {}
