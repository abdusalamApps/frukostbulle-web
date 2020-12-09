import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToBakeryComponent } from './send-to-bakery.component';

describe('SendToBakeryComponent', () => {
  let component: SendToBakeryComponent;
  let fixture: ComponentFixture<SendToBakeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToBakeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToBakeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
