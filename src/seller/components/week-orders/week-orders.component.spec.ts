import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekOrdersComponent } from './week-orders.component';

describe('WeekOrdersComponent', () => {
  let component: WeekOrdersComponent;
  let fixture: ComponentFixture<WeekOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
