import { TestBed } from '@angular/core/testing';

import { DustbinService } from './dustbin.service';

describe('DustbinService', () => {
  let service: DustbinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DustbinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
