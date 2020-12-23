import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkOrderDialog } from './mark-order-dialog.component';

describe('MarkOrderComponent', () => {
  let component: MarkOrderDialog;
  let fixture: ComponentFixture<MarkOrderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkOrderDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkOrderDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
