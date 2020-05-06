import { async, TestBed } from '@angular/core/testing';
import { CreateRuleModalModule } from './create-rule-modal.module';

describe('CreateRuleModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreateRuleModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CreateRuleModalModule).toBeDefined();
  });
});
