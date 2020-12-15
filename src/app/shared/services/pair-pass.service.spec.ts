import { TestBed } from '@angular/core/testing';

import { PairPassService } from './pair-pass.service';

describe('PairPassService', () => {
  let service: PairPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PairPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
