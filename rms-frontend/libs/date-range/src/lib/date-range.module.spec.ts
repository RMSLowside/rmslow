import { async, TestBed } from '@angular/core/testing';
import { DateRangeModule } from './date-range.module';

describe('DateRangeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DateRangeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DateRangeModule).toBeDefined();
  });
});
