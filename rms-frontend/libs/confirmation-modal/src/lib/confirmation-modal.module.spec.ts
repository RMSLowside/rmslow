import { async, TestBed } from '@angular/core/testing';
import { ConfirmationModalModule } from './confirmation-modal.module';

describe('ConfirmationModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmationModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ConfirmationModalModule).toBeDefined();
  });
});
