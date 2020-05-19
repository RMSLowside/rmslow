import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderRulesModalComponent } from './test-rules-modal.component';

describe('TestRulesModalComponent', () => {
  let component: TestRulesModalComponent;
  let fixture: ComponentFixture<TestRulesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRulesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
