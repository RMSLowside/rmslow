import { async, TestBed } from '@angular/core/testing';
import { DynamicFormsModule } from './forms.module';

describe('FormsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicFormsModule).toBeDefined();
  });
});
