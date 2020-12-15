import { TestBed } from '@angular/core/testing';

import { LoggedInAuthService } from './logged-in-auth.service';

describe('LoggedInAuthService', () => {
  let service: LoggedInAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
