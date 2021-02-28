import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  icon = 'settings';
  size: string = 'xs';
  color!: string;

  change() {
    this.icon = 'settings';
    this.size = 'lg';
    this.color = 'red';
  }
}
