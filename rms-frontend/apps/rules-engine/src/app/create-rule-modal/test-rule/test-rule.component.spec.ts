import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRuleComponent } from './test-rule.component';
import { CoreModule } from '@rms-frontend/core';

describe('TestRuleComponent', () => {
  let component: TestRuleComponent;
  let fixture: ComponentFixture<TestRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRuleComponent],
      imports: [CoreModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
