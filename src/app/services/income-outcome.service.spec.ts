import { TestBed } from '@angular/core/testing';

import { IncomeOutcomeService } from './income-outcome.service';

describe('IncomeOutcomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncomeOutcomeService = TestBed.get(IncomeOutcomeService);
    expect(service).toBeTruthy();
  });
});
