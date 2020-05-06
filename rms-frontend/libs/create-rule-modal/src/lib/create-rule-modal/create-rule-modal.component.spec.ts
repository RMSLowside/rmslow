import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRuleModalComponent } from './create-rule-modal.component';

describe('CreateRuleModalComponent', () => {
  let component: CreateRuleModalComponent;
  let fixture: ComponentFixture<CreateRuleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRuleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRuleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
