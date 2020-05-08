import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySegmentComponent } from './history-segment.component';

describe('HistorySegmentComponent', () => {
  let component: HistorySegmentComponent;
  let fixture: ComponentFixture<HistorySegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
