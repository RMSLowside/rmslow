import { async, TestBed } from '@angular/core/testing';
import { TextAddModalModule } from './text-add-modal.module';

describe('TextAddModalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TextAddModalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TextAddModalModule).toBeDefined();
  });
});
