import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  icon = 'location';
  size: any = 'xs';
  color;

  change() {
    this.icon = 'settings';
    this.size = 'lg';
    this.color = 'red';
  }
}
