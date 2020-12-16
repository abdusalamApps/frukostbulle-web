import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersAndBuyersComponent } from './sellers-and-buyers.component';

describe('SellersAndBuyersComponent', () => {
  let component: SellersAndBuyersComponent;
  let fixture: ComponentFixture<SellersAndBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellersAndBuyersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersAndBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
