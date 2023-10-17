import { TestBed } from '@angular/core/testing';

import { StartwarService } from './startwar.service';

describe('StartwarService', () => {
  let service: StartwarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartwarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
