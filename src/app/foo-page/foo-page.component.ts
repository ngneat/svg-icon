import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '@ngneat/svg-icon';

@Component({
  selector: 'app-foo-page',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './foo-page.component.html',
  styleUrls: ['./foo-page.component.scss'],
})
export class FooPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
