import { async, TestBed } from '@angular/core/testing';
import { VersionHistoryModule } from './version-history.module';

describe('VersionHistoryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [VersionHistoryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(VersionHistoryModule).toBeDefined();
  });
});
