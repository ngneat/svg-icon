import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooPageComponent } from './foo-page.component';

describe('FooPageComponent', () => {
  let component: FooPageComponent;
  let fixture: ComponentFixture<FooPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FooPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
