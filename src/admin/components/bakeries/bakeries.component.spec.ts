import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeriesComponent } from './bakeries.component';

describe('BakeriesComponent', () => {
  let component: BakeriesComponent;
  let fixture: ComponentFixture<BakeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BakeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BakeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
