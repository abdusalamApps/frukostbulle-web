import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNoLoginComponent } from './order-no-login.component';

describe('OrderNoLoginComponent', () => {
  let component: OrderNoLoginComponent;
  let fixture: ComponentFixture<OrderNoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderNoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
