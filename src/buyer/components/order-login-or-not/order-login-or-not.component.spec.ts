import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLoginOrNotComponent } from './order-login-or-not.component';

describe('OrderLoginOrNotComponent', () => {
  let component: OrderLoginOrNotComponent;
  let fixture: ComponentFixture<OrderLoginOrNotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderLoginOrNotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLoginOrNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
