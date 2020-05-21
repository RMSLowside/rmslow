import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryListComponent } from './history-list.component';
import { CoreModule } from '@rms-frontend/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HistorySegmentComponent } from '../history-segment/history-segment.component';

describe('HistoryListComponent', () => {
  let component: HistoryListComponent;
  let fixture: ComponentFixture<HistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryListComponent],
      imports: [CoreModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
