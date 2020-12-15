import { TestBed } from '@angular/core/testing';

import { TransferUserService } from './transfer-user.service';

describe('TransferUserService', () => {
  let service: TransferUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
