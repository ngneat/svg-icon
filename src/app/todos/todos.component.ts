import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  color = 'hotpink';
  key = 'location';
  size = 'lg';
  change() {
    this.color = 'blue';
    this.key = this.key === 'dashboard' ? 'location' : 'dashboard';
  }
  constructor() {}

  ngOnInit(): void {}
}
