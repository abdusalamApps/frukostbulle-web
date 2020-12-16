import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBakeryComponent } from './manage-bakery.component';

describe('ManageBakeryComponent', () => {
  let component: ManageBakeryComponent;
  let fixture: ComponentFixture<ManageBakeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBakeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBakeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
