import { async, TestBed } from '@angular/core/testing';
import { OrderRulesModalModule } from './order-rules-modal.module';

describe('OrderRulesModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderRulesModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(OrderRulesModalModule).toBeDefined();
  });
});
