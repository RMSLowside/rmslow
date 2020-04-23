import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part2Component } from './part2.component';
import { CoreModule } from '@rms-frontend/core';

describe('Part2Component', () => {
  let component: Part2Component;
  let fixture: ComponentFixture<Part2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Part2Component],
      imports: [CoreModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
