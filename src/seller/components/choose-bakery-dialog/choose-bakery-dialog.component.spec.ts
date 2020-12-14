import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBakeryDialogComponent } from './choose-bakery-dialog.component';

describe('ChooseBakeryDialogComponent', () => {
  let component: ChooseBakeryDialogComponent;
  let fixture: ComponentFixture<ChooseBakeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBakeryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBakeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
