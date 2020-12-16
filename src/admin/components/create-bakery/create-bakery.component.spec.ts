import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBakeryComponent } from './create-bakery.component';

describe('CreateBakeryComponent', () => {
  let component: CreateBakeryComponent;
  let fixture: ComponentFixture<CreateBakeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBakeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBakeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
