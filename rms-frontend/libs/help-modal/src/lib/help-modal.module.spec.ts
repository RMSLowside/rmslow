import { async, TestBed } from '@angular/core/testing';
import { HelpModalModule } from './help-modal.module';

describe('HelpModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HelpModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HelpModalModule).toBeDefined();
  });
});
