import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDaysComponent } from './choose-days.component';

describe('ChooseDaysComponent', () => {
  let component: ChooseDaysComponent;
  let fixture: ComponentFixture<ChooseDaysComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
