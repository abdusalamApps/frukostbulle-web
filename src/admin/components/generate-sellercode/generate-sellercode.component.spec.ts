import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSellercodeComponent } from './generate-sellercode.component';

describe('GenerateSellercodeComponent', () => {
  let component: GenerateSellercodeComponent;
  let fixture: ComponentFixture<GenerateSellercodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateSellercodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSellercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
