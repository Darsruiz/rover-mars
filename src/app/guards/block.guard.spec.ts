import { TestBed } from '@angular/core/testing';

import { BlockGuard } from './block.guard';

describe('BlockGuard', () => {
  let guard: BlockGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
