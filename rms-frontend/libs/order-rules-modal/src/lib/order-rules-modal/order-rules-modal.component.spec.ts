import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderRulesModalComponent } from './order-rules-modal.component';

describe('OrderRulesModalComponent', () => {
  let component: OrderRulesModalComponent;
  let fixture: ComponentFixture<OrderRulesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRulesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
