import { TestBed } from '@angular/core/testing';

import { FormAccountService } from './form-account.service';

describe('FormAccountService', () => {
  let service: FormAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
