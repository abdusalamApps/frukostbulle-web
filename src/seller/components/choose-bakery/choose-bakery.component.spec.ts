import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBakeryComponent } from './choose-bakery.component';

describe('ChooseBakeryComponent', () => {
  let component: ChooseBakeryComponent;
  let fixture: ComponentFixture<ChooseBakeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBakeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBakeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
