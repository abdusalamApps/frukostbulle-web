import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAreaComponent } from './seller-area.component';

describe('MapComponent', () => {
  let component: SellerAreaComponent;
  let fixture: ComponentFixture<SellerAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
