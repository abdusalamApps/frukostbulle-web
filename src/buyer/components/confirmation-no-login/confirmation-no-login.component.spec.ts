import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationNoLoginComponent } from './confirmation-no-login.component';

describe('ConfirmationNoLoginComponent', () => {
  let component: ConfirmationNoLoginComponent;
  let fixture: ComponentFixture<ConfirmationNoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationNoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
