import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAddModalComponent } from './text-add-modal.component';

describe('DateRangeComponent', () => {
  let component: TextAddModalComponent;
  let fixture: ComponentFixture<TextAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
