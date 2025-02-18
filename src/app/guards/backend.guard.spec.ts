import { TestBed } from '@angular/core/testing';

import { BackendGuard } from './backend.guard';

describe('BackendGuard', () => {
  let guard: BackendGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BackendGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
