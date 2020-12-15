import { TestBed } from '@angular/core/testing';

import { ItemsGuard } from './items.guard';

describe('ItemsGuard', () => {
  let guard: ItemsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ItemsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
