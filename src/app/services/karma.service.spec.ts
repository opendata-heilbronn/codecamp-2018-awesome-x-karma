import { TestBed } from '@angular/core/testing';

import { KarmaService } from './karma.service';

describe('KarmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KarmaService = TestBed.get(KarmaService);
    expect(service).toBeTruthy();
  });
});
