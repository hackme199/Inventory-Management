import { TestBed } from '@angular/core/testing';

import { DispatchHistoryService } from './dispatch-history.service';

describe('DispatchHistoryService', () => {
  let service: DispatchHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatchHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
