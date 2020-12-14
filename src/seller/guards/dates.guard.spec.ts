import { TestBed } from '@angular/core/testing';

import { DatesGuard } from './dates.guard';

describe('DatesGuard', () => {
  let guard: DatesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DatesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
